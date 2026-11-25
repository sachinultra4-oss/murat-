import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, type User } from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type Timestamp,
} from 'firebase/firestore';
import { Download, LogOut, Trash2 } from 'lucide-react';
import { auth, db, handleFirestoreError, OperationType } from '@/src/lib/firebase';
import { SITE_CONFIG } from '@/src/config/site';
import { Button } from '@/src/components/ui/button';
import { Input, Textarea } from '@/src/components/ui/form-primitives';

type EnquiryStatus = 'new' | 'contacted' | 'booked' | 'archived';

interface EnquiryRecord {
  id: string;
  coupleName: string;
  phone: string;
  email: string;
  weddingDate: string;
  city: string;
  services: string[];
  budgetRange: string;
  guestCount: string;
  story: string;
  status: EnquiryStatus;
  adminNotes: string;
  source: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const STATUS_OPTIONS: EnquiryStatus[] = ['new', 'contacted', 'booked', 'archived'];

const STATUS_LABELS: Record<EnquiryStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  booked: 'Booked',
  archived: 'Archived',
};

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryRecord[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | EnquiryStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState('');
  const [savingNote, setSavingNote] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        navigate('/admin/login', { replace: true });
        return;
      }
      setUser(currentUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, [navigate]);

  useEffect(() => {
    if (!authReady || !user) return;
    setLoadingData(true);
    setPermissionError(null);

    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const items: EnquiryRecord[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            coupleName: String(data.coupleName ?? ''),
            phone: String(data.phone ?? ''),
            email: String(data.email ?? ''),
            weddingDate: String(data.weddingDate ?? ''),
            city: String(data.city ?? ''),
            services: Array.isArray(data.services) ? data.services.map(String) : [],
            budgetRange: String(data.budgetRange ?? ''),
            guestCount: String(data.guestCount ?? ''),
            story: String(data.story ?? ''),
            status: (STATUS_OPTIONS.includes(data.status) ? data.status : 'new') as EnquiryStatus,
            adminNotes: String(data.adminNotes ?? ''),
            source: String(data.source ?? ''),
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
          };
        });
        setEnquiries(items);
        setLoadingData(false);
      },
      (err) => {
        setLoadingData(false);
        setPermissionError(
          `Access restricted for ${user.email ?? 'this account'}. Ensure you are signed in with an authorised studio admin email.`,
        );
        try {
          handleFirestoreError(err, OperationType.LIST, 'enquiries');
        } catch {
          // Handled cleanly via permissionError UI banner
        }
      },
    );

    return () => unsub();
  }, [authReady, user]);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return enquiries.filter((item) => {
      if (statusFilter !== 'all' && item.status !== statusFilter) return false;
      if (!q) return true;
      return (
        item.coupleName.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        item.weddingDate.toLowerCase().includes(q)
      );
    });
  }, [enquiries, statusFilter, searchTerm]);

  const selectedEnquiry = useMemo(
    () => enquiries.find((e) => e.id === selectedId) ?? filtered[0] ?? null,
    [enquiries, filtered, selectedId],
  );

  useEffect(() => {
    if (selectedEnquiry) {
      setNoteDraft(selectedEnquiry.adminNotes);
    }
  }, [selectedEnquiry?.id, selectedEnquiry?.adminNotes]);

  const handleStatusChange = async (enquiryId: string, nextStatus: EnquiryStatus) => {
    const path = `enquiries/${enquiryId}`;
    try {
      await updateDoc(doc(db, 'enquiries', enquiryId), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNote(true);
    const path = `enquiries/${selectedEnquiry.id}`;
    try {
      await updateDoc(doc(db, 'enquiries', selectedEnquiry.id), {
        adminNotes: noteDraft.slice(0, 2000),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, path);
    } finally {
      setSavingNote(false);
    }
  };

  const handleDelete = async (enquiryId: string) => {
    const path = `enquiries/${enquiryId}`;
    try {
      await deleteDoc(doc(db, 'enquiries', enquiryId));
      if (selectedId === enquiryId) setSelectedId(null);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, path);
    }
  };

  const exportCsv = () => {
    const headers = [
      'Couple Name',
      'Phone',
      'Email',
      'Wedding Date',
      'City',
      'Services',
      'Budget Range',
      'Guest Count',
      'Status',
      'Story',
      'Admin Notes',
    ];
    const escapeCell = (val: string) => `"${val.replace(/"/g, '""')}"`;
    const rows = filtered.map((e) =>
      [
        e.coupleName,
        e.phone,
        e.email,
        e.weddingDate,
        e.city,
        e.services.join('; '),
        e.budgetRange,
        e.guestCount,
        e.status,
        e.story,
        e.adminNotes,
      ]
        .map(escapeCell)
        .join(','),
    );
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `muhurat-wedding-enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1F1D1B]">
      <header className="border-b border-[#B89B6A]/40 bg-[#FAF6EE]">
        <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-16 md:h-20 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-4 min-w-0">
            <Link
              to="/"
              className="font-display text-[20px] md:text-[24px] font-semibold tracking-[0.06em] uppercase text-[#1F1D1B] whitespace-nowrap shrink-0"
            >
              {SITE_CONFIG.brandName}
            </Link>
            <span className="hidden sm:inline text-[14px] text-[#8A6F3F] truncate">
              Studio Leads Portal
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button type="button" variant="secondary" size="sm" onClick={exportCsv}>
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      <main id="main-content" className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-14">
        {!SITE_CONFIG.WHATSAPP_NUMBER.trim() ? (
          <div className="mb-6 rounded-[4px] border border-[#B89B6A]/60 bg-[#F2EBDD] px-4 py-3 text-[14px] text-[#785E32]">
            Configuration note: Set <code className="font-mono">WHATSAPP_NUMBER</code> and{' '}
            <code className="font-mono">META_PIXEL_ID</code> in{' '}
            <code className="font-mono">src/config/site.ts</code> when ready to activate WhatsApp
            buttons and Meta Pixel tracking.
          </div>
        ) : null}

        {permissionError ? (
          <div
            role="alert"
            className="rounded-[4px] border border-[#8A2E2E]/40 bg-[#F9EFEF] p-6 text-[#7A1F1F]"
          >
            <h1 className="font-display text-[28px] font-medium mb-2">
              Authorisation Required
            </h1>
            <p className="text-[16px] mb-5">{permissionError}</p>
            <Button type="button" variant="primary" onClick={handleSignOut}>
              Sign In With Another Account
            </Button>
          </div>
        ) : (
          <>
            {/* Summary Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="rounded-[4px] border border-[#B89B6A]/35 bg-[#F2EBDD] p-4">
                <p className="text-[13px] text-[#785E32]">Total Enquiries</p>
                <p className="font-display text-[34px] font-medium tabular-nums mt-1">
                  {enquiries.length}
                </p>
              </div>
              <div className="rounded-[4px] border border-[#B89B6A]/35 bg-[#F2EBDD] p-4">
                <p className="text-[13px] text-[#785E32]">New Leads</p>
                <p className="font-display text-[34px] font-medium tabular-nums mt-1">
                  {enquiries.filter((e) => e.status === 'new').length}
                </p>
              </div>
              <div className="rounded-[4px] border border-[#B89B6A]/35 bg-[#F2EBDD] p-4">
                <p className="text-[13px] text-[#785E32]">Contacted</p>
                <p className="font-display text-[34px] font-medium tabular-nums mt-1">
                  {enquiries.filter((e) => e.status === 'contacted').length}
                </p>
              </div>
              <div className="rounded-[4px] border border-[#B89B6A]/35 bg-[#F2EBDD] p-4">
                <p className="text-[13px] text-[#785E32]">Booked</p>
                <p className="font-display text-[34px] font-medium tabular-nums mt-1">
                  {enquiries.filter((e) => e.status === 'booked').length}
                </p>
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                {(['all', ...STATUS_OPTIONS] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setStatusFilter(status)}
                    className={`min-h-[44px] px-4 py-2 rounded-[4px] border text-[14px] font-medium cursor-pointer transition-colors ${
                      statusFilter === status
                        ? 'bg-[#1F1D1B] text-[#FAF6EE] border-[#1F1D1B]'
                        : 'bg-[#FAF6EE] text-[#1F1D1B] border-[#B89B6A]/45 hover:border-[#1F1D1B]'
                    }`}
                  >
                    {status === 'all' ? 'All' : STATUS_LABELS[status]}
                  </button>
                ))}
              </div>

              <div className="w-full md:w-72">
                <Input
                  type="search"
                  aria-label="Search enquiries"
                  placeholder="Search couple, city, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loadingData ? (
              <div className="rounded-[4px] border border-[#B89B6A]/35 bg-[#F2EBDD] p-8 text-center text-[16px] text-[#785E32]">
                Loading wedding enquiries...
              </div>
            ) : filtered.length === 0 ? (
              <div className="rounded-[4px] border border-[#B89B6A]/35 bg-[#F2EBDD] p-10 text-center">
                <p className="font-display text-[26px] font-medium mb-1">No enquiries found</p>
                <p className="text-[16px] text-[#1F1D1B]/75">
                  New wedding date submissions from your landing page will appear here immediately.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* List */}
                <div className="lg:col-span-6 space-y-3">
                  {filtered.map((item) => {
                    const isSelected = selectedEnquiry?.id === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSelectedId(item.id)}
                        className={`w-full text-left rounded-[4px] border p-4 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#F2EBDD] border-[#1F1D1B]'
                            : 'bg-[#FAF6EE] border-[#B89B6A]/35 hover:border-[#1F1D1B]/60'
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-3">
                          <h2 className="font-display text-[24px] font-medium text-[#1F1D1B]">
                            {item.coupleName}
                          </h2>
                          <span className="text-[13px] font-medium text-[#8A6F3F] shrink-0">
                            {STATUS_LABELS[item.status]}
                          </span>
                        </div>
                        <p className="text-[14px] text-[#1F1D1B]/75 mt-1">
                          {item.weddingDate} · {item.city}
                        </p>
                        <p className="text-[14px] text-[#1F1D1B]/65 mt-0.5 tabular-nums">
                          {item.phone} · {item.budgetRange}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Detail Panel */}
                {selectedEnquiry ? (
                  <div className="lg:col-span-6 rounded-[4px] border border-[#B89B6A]/45 bg-[#F2EBDD] p-6 md:p-7">
                    <div className="flex items-start justify-between gap-4 pb-5 border-b border-[#B89B6A]/35">
                      <div>
                        <h2 className="font-display text-[30px] font-medium leading-tight">
                          {selectedEnquiry.coupleName}
                        </h2>
                        <p className="text-[15px] text-[#785E32] mt-1">
                          {selectedEnquiry.weddingDate} · {selectedEnquiry.city}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDelete(selectedEnquiry.id)}
                        aria-label={`Delete enquiry from ${selectedEnquiry.coupleName}`}
                        className="min-w-[44px] min-h-[44px] inline-flex items-center justify-center rounded-[4px] border border-[#B89B6A]/45 text-[#7A1F1F] hover:border-[#7A1F1F] cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <dl className="py-5 space-y-3 text-[15px] border-b border-[#B89B6A]/35">
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#785E32]">Phone</dt>
                        <dd className="font-medium tabular-nums">
                          <a href={`tel:${selectedEnquiry.phone}`} className="underline">
                            {selectedEnquiry.phone}
                          </a>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#785E32]">Email</dt>
                        <dd className="font-medium break-all">
                          <a href={`mailto:${selectedEnquiry.email}`} className="underline">
                            {selectedEnquiry.email}
                          </a>
                        </dd>
                      </div>
                      <div className="flex justify-between gap-4">
                        <dt className="text-[#785E32]">Scope / Budget</dt>
                        <dd className="font-medium text-right">{selectedEnquiry.budgetRange}</dd>
                      </div>
                      {selectedEnquiry.guestCount ? (
                        <div className="flex justify-between gap-4">
                          <dt className="text-[#785E32]">Guest Count</dt>
                          <dd className="font-medium">{selectedEnquiry.guestCount}</dd>
                        </div>
                      ) : null}
                      <div>
                        <dt className="text-[#785E32] mb-1">Services Requested</dt>
                        <dd className="text-[#1F1D1B]">
                          {selectedEnquiry.services.join(' · ')}
                        </dd>
                      </div>
                      {selectedEnquiry.story ? (
                        <div>
                          <dt className="text-[#785E32] mb-1">Wedding Vision</dt>
                          <dd className="text-[#1F1D1B]/85 whitespace-pre-line">
                            {selectedEnquiry.story}
                          </dd>
                        </div>
                      ) : null}
                    </dl>

                    <div className="pt-5 space-y-5">
                      <div>
                        <label
                          htmlFor="admin-status-select"
                          className="block text-[14px] font-medium text-[#1F1D1B] mb-2"
                        >
                          Pipeline Status
                        </label>
                        <select
                          id="admin-status-select"
                          value={selectedEnquiry.status}
                          onChange={(e) =>
                            handleStatusChange(
                              selectedEnquiry.id,
                              e.target.value as EnquiryStatus,
                            )
                          }
                          className="flex min-h-[44px] w-full rounded-[4px] border border-[#B89B6A]/55 bg-[#FAF6EE] px-4 py-2 text-[16px] text-[#1F1D1B]"
                        >
                          {STATUS_OPTIONS.map((st) => (
                            <option key={st} value={st}>
                              {STATUS_LABELS[st]}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="admin-notes-input"
                          className="block text-[14px] font-medium text-[#1F1D1B] mb-2"
                        >
                          Studio Notes
                        </label>
                        <Textarea
                          id="admin-notes-input"
                          maxLength={2000}
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          placeholder="Add consultation notes, quote sent date, or follow-up reminders..."
                        />
                        <div className="mt-3">
                          <Button
                            type="button"
                            variant="primary"
                            size="sm"
                            disabled={savingNote}
                            onClick={handleSaveNotes}
                          >
                            {savingNote ? 'Saving...' : 'Save Notes'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
