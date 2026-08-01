import { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';

type Client = {
  id: string;
  company: string;
  contactName?: string;
  phone?: string;
  email?: string;
  sector?: string;
  status?: string;
  address?: string;
  createdAt?: string;
};

type ClientForm = {
  company: string;
  contactName: string;
  phone: string;
  email: string;
  sector: string;
  status: string;
  address: string;
};

const EMPTY_FORM: ClientForm = {
  company: '',
  contactName: '',
  phone: '',
  email: '',
  sector: '',
  status: 'Actif',
  address: '',
};

const API_BASE = '/api';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [form, setForm] = useState<ClientForm>(EMPTY_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadClients = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/clients`, {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Erreur API ${response.status}`);
      }

      const data = await response.json();
      setClients(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Impossible de charger les clients.',
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadClients();
  }, [loadClients]);

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();

    if (!term) return clients;

    return clients.filter((client) =>
      [
        client.company,
        client.contactName,
        client.phone,
        client.email,
        client.sector,
        client.status,
      ].some((value) => value?.toLowerCase().includes(term)),
    );
  }, [clients, search]);

  function updateField<K extends keyof ClientForm>(
    field: K,
    value: ClientForm[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(false);
  }

  function startEdit(client: Client) {
    setEditingId(client.id);
    setForm({
      company: client.company ?? '',
      contactName: client.contactName ?? '',
      phone: client.phone ?? '',
      email: client.email ?? '',
      sector: client.sector ?? '',
      status: client.status ?? 'Actif',
      address: client.address ?? '',
    });
    setShowForm(true);
    setMessage('');
    setError('');
  }

  async function submitClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.company.trim()) {
      setError("Le nom de l'entreprise est obligatoire.");
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const url = editingId
        ? `${API_BASE}/clients/${editingId}`
        : `${API_BASE}/clients`;

      const response = await fetch(url, {
        method: editingId ? 'PATCH' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          company: form.company.trim(),
          contactName: form.contactName.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          sector: form.sector.trim(),
          status: form.status,
          address: form.address.trim(),
        }),
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(
          body || `Échec de l'enregistrement — erreur ${response.status}`,
        );
      }

      setMessage(
        editingId
          ? 'Client modifié avec succès.'
          : 'Client enregistré avec succès.',
      );

      resetForm();
      await loadClients();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Impossible d'enregistrer le client.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteClient(client: Client) {
    const confirmed = window.confirm(
      `Supprimer définitivement le client « ${client.company} » ?`,
    );

    if (!confirmed) return;

    setMessage('');
    setError('');

    try {
      const response = await fetch(`${API_BASE}/clients/${client.id}`, {
        method: 'DELETE',
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error(`Suppression impossible — erreur ${response.status}`);
      }

      setMessage('Client supprimé.');
      await loadClients();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Impossible de supprimer le client.',
      );
    }
  }

  return (
    <main className="page">
      <section
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ marginBottom: 6 }}>CRM Clients</h1>
          <p style={{ margin: 0 }}>
            Clients, contacts et informations commerciales
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setForm(EMPTY_FORM);
            setEditingId(null);
            setShowForm(true);
            setMessage('');
            setError('');
          }}
        >
          + Nouveau client
        </button>
      </section>

      {message && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            border: '1px solid #b7dfc5',
            borderRadius: 8,
          }}
        >
          {message}
        </div>
      )}

      {error && (
        <div
          style={{
            padding: 12,
            marginBottom: 16,
            border: '1px solid #e5a5a5',
            borderRadius: 8,
          }}
        >
          {error}
        </div>
      )}

      {showForm && (
        <section
          style={{
            padding: 20,
            marginBottom: 24,
            border: '1px solid #ddd',
            borderRadius: 12,
          }}
        >
          <h2>{editingId ? 'Modifier le client' : 'Nouveau client'}</h2>

          <form onSubmit={submitClient}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 14,
              }}
            >
              <label>
                Entreprise *
                <input
                  value={form.company}
                  onChange={(event) =>
                    updateField('company', event.target.value)
                  }
                  required
                />
              </label>

              <label>
                Contact
                <input
                  value={form.contactName}
                  onChange={(event) =>
                    updateField('contactName', event.target.value)
                  }
                />
              </label>

              <label>
                Téléphone
                <input
                  value={form.phone}
                  onChange={(event) =>
                    updateField('phone', event.target.value)
                  }
                />
              </label>

              <label>
                E-mail
                <input
                  type="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField('email', event.target.value)
                  }
                />
              </label>

              <label>
                Secteur
                <input
                  value={form.sector}
                  onChange={(event) =>
                    updateField('sector', event.target.value)
                  }
                />
              </label>

              <label>
                Statut
                <select
                  value={form.status}
                  onChange={(event) =>
                    updateField('status', event.target.value)
                  }
                >
                  <option value="Prospect">Prospect</option>
                  <option value="Actif">Actif</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </label>

              <label style={{ gridColumn: '1 / -1' }}>
                Adresse
                <input
                  value={form.address}
                  onChange={(event) =>
                    updateField('address', event.target.value)
                  }
                />
              </label>
            </div>

            <div
              style={{
                display: 'flex',
                gap: 10,
                marginTop: 18,
              }}
            >
              <button type="submit" disabled={saving}>
                {saving
                  ? 'Enregistrement...'
                  : editingId
                    ? 'Enregistrer les modifications'
                    : 'Enregistrer le client'}
              </button>

              <button type="button" onClick={resetForm}>
                Annuler
              </button>
            </div>
          </form>
        </section>
      )}

      <section>
        <input
          type="search"
          placeholder="Rechercher un client..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          style={{
            width: '100%',
            maxWidth: 420,
            marginBottom: 18,
          }}
        />

        {loading ? (
          <p>Chargement des clients...</p>
        ) : filteredClients.length === 0 ? (
          <div
            style={{
              padding: 28,
              border: '1px solid #ddd',
              borderRadius: 12,
              textAlign: 'center',
            }}
          >
            Aucun client enregistré.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Entreprise</th>
                  <th>Contact</th>
                  <th>Téléphone</th>
                  <th>E-mail</th>
                  <th>Secteur</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.company}</td>
                    <td>{client.contactName || '—'}</td>
                    <td>{client.phone || '—'}</td>
                    <td>{client.email || '—'}</td>
                    <td>{client.sector || '—'}</td>
                    <td>{client.status || '—'}</td>
                    <td>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <button
                          type="button"
                          onClick={() => startEdit(client)}
                        >
                          Modifier
                        </button>

                        <button
                          type="button"
                          onClick={() => void deleteClient(client)}
                        >
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
