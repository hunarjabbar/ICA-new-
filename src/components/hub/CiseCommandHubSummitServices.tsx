import React, { useState, useEffect } from 'react';
import { apiFetch } from '../../lib/api';
import { toast } from 'sonner';
import { 
  Building2, Landmark, ShieldCheck, CheckCircle2, 
  Clock, DollarSign, Layers, Users, Search, Filter, 
  ArrowRight, Check, X, Edit, RefreshCw, AlertCircle, FileText
} from 'lucide-react';

export function CiseCommandHubSummitServices() {
  const [activeSubTab, setActiveSubTab] = useState<'vips' | 'booths' | 'dossiers'>('vips');
  const [vips, setVips] = useState<any[]>([]);
  const [booths, setBooths] = useState<any[]>([]);
  const [dossiers, setDossiers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vipsRes, boothsRes, dossiersRes] = await Promise.all([
        apiFetch('/api/hub/summit/vip-registrations').then(r => r.json()),
        apiFetch('/api/summit/floorplan/booths').then(r => r.json()),
        apiFetch('/api/hub/services/dossiers').then(r => r.json())
      ]);
      if (vipsRes.registrations) setVips(vipsRes.registrations);
      if (boothsRes.booths) setBooths(boothsRes.booths);
      if (dossiersRes.dossiers) setDossiers(dossiersRes.dossiers);
    } catch (e) {
      console.error('Failed to fetch summit/services data:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateVipStatus = async (id: string, status: string) => {
    try {
      const res = await apiFetch(`/api/hub/summit/vip-registrations/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setVips(prev => prev.map(v => (v.id === id || v.code === id) ? { ...v, status } : v));
        toast.success(`VIP accreditation status updated to ${status}.`);
      }
    } catch (err) {
      console.error('Failed to update VIP status:', err);
      toast.error('Failed to update VIP status');
    }
  };

  const handleUpdateBoothStatus = async (id: string, status: string) => {
    try {
      const res = await apiFetch(`/api/hub/summit/booths/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        setBooths(prev => prev.map(b => b.id === id ? { ...b, status } : b));
        toast.success(`Booth ${id} status set to ${status}.`);
      }
    } catch (err) {
      console.error('Failed to update booth status:', err);
      toast.error('Failed to update booth status');
    }
  };

  const handleAdvanceDossierStage = async (code: string, currentStage: string) => {
    const stages = ["SUBMITTED", "COMPLIANCE_REVIEW", "INTERBANK_VERIFIED", "SOVEREIGN_APPROVED", "DISPATCHED"];
    const currentIndex = stages.indexOf(currentStage);
    const nextStage = currentIndex < stages.length - 1 ? stages[currentIndex + 1] : stages[currentIndex];
    try {
      const res = await apiFetch(`/api/hub/services/dossiers/${code}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: nextStage })
      });
      const data = await res.json();
      if (data.success) {
        setDossiers(prev => prev.map(d => d.code === code ? { ...d, stage: nextStage } : d));
        toast.success(`Dossier ${code} advanced to stage ${nextStage}.`);
      }
    } catch (err) {
      console.error('Failed to advance dossier stage:', err);
      toast.error('Failed to advance dossier stage');
    }
  };

  return (
    <div className="space-y-6 text-start">
      {/* Header Bar: Pure Red and White */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-600">
            <Landmark className="w-4 h-4" />
            <span>CISE Command Hub · Sovereign Operations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
            Summit Operations & CISE Services Governance Ledger
          </h2>
        </div>

        <button
          onClick={fetchData}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Sync State</span>
        </button>
      </div>

      {actionMessage && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-red-600" />
          <span>{actionMessage}</span>
        </div>
      )}

      {/* Sub-Tabs: VIPs, Booths, Dossiers */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveSubTab('vips')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'vips'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-red-600 border border-slate-200'
          }`}
        >
          VIP Diplomatic Accreditations ({vips.length})
        </button>
        <button
          onClick={() => setActiveSubTab('booths')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'booths'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-red-600 border border-slate-200'
          }`}
        >
          3D Fairground Booth Allocations ({booths.length})
        </button>
        <button
          onClick={() => setActiveSubTab('dossiers')}
          className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
            activeSubTab === 'dossiers'
              ? 'bg-red-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:text-red-600 border border-slate-200'
          }`}
        >
          CISE Universal Service Dossiers ({dossiers.length})
        </button>
      </div>

      {/* TAB 1: VIP ACCREDITATIONS */}
      {activeSubTab === 'vips' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Diplomatic Dignitary Registry
            </span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search dignitary, country, code..."
              className="px-3 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-red-600 outline-hidden w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Accreditation Code</th>
                  <th className="py-3 px-4">Dignitary & Title</th>
                  <th className="py-3 px-4">Ministry / Jurisdiction</th>
                  <th className="py-3 px-4">Delegation</th>
                  <th className="py-3 px-4">Privileges</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {vips
                  .filter(v => !search || v.officialName.toLowerCase().includes(search.toLowerCase()) || v.code.toLowerCase().includes(search.toLowerCase()))
                  .map(vip => (
                    <tr key={vip.id} className="hover:bg-slate-50/70">
                      <td className="py-3 px-4 font-mono font-black text-red-600">{vip.code}</td>
                      <td className="py-3 px-4">
                        <strong className="text-slate-900 block">{vip.officialName}</strong>
                        <span className="text-slate-500">{vip.diplomaticTitle}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-slate-800 font-bold block">{vip.ministryOrEntity}</span>
                        <span className="text-slate-500">{vip.country}</span>
                      </td>
                      <td className="py-3 px-4 tabular-nums font-bold text-slate-700">
                        {vip.delegationCount} Pax
                      </td>
                      <td className="py-3 px-4 text-slate-600">
                        {vip.requiresSecurityEscort && <span className="block text-red-700 font-bold">· Motorcade Escort</span>}
                        {vip.requiresBilingualAide && <span className="block text-slate-600">· Senior Interpreter</span>}
                        {vip.bilateralSalonRequested && <span className="block text-slate-600">· Private Salon</span>}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                          vip.status === 'APPROVED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : vip.status === 'REJECTED'
                            ? 'bg-rose-100 text-rose-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {vip.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-end space-x-1.5">
                        {vip.status !== 'APPROVED' && (
                          <button
                            onClick={() => handleUpdateVipStatus(vip.id, 'APPROVED')}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700"
                          >
                            Approve
                          </button>
                        )}
                        {vip.status !== 'REJECTED' && (
                          <button
                            onClick={() => handleUpdateVipStatus(vip.id, 'REJECTED')}
                            className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700 font-bold text-[11px] hover:bg-slate-300"
                          >
                            Decline
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: 3D FAIRGROUND BOOTHS */}
      {activeSubTab === 'booths' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Pavilion Floorplan Allocation Grid
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Booth ID</th>
                  <th className="py-3 px-4">Hall & Location</th>
                  <th className="py-3 px-4">Sector Focus</th>
                  <th className="py-3 px-4">Size & Format</th>
                  <th className="py-3 px-4">Base Rate (USD)</th>
                  <th className="py-3 px-4">Status & Exhibitor</th>
                  <th className="py-3 px-4 text-end">Toggle Allocation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {booths.map(b => (
                  <tr key={b.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono font-black text-red-600">{b.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-800">{b.hallName}</td>
                    <td className="py-3 px-4 text-slate-600">{b.sectorName}</td>
                    <td className="py-3 px-4 font-bold text-slate-700">{b.size} · {b.type}</td>
                    <td className="py-3 px-4 tabular-nums font-black text-slate-900">${b.price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase mr-2 ${
                        b.status === 'reserved'
                          ? 'bg-rose-100 text-rose-800'
                          : b.status === 'selected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {b.status}
                      </span>
                      {b.exhibitor && <span className="font-bold text-slate-800 text-[11px]">{b.exhibitor}</span>}
                    </td>
                    <td className="py-3 px-4 text-end space-x-1">
                      <button
                        onClick={() => handleUpdateBoothStatus(b.id, b.status === 'reserved' ? 'available' : 'reserved')}
                        className="px-2 py-1 rounded-lg border border-slate-200 hover:border-red-600 text-slate-700 hover:text-red-600 font-bold text-[11px]"
                      >
                        {b.status === 'reserved' ? 'Set Available' : 'Mark Reserved'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CISE SERVICE DOSSIERS */}
      {activeSubTab === 'dossiers' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              Universal Service Application Queue
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-start">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Dossier Code</th>
                  <th className="py-3 px-4">Applicant & Entity</th>
                  <th className="py-3 px-4">Service Pillar</th>
                  <th className="py-3 px-4">Statutory Fee</th>
                  <th className="py-3 px-4">SLA / Officer</th>
                  <th className="py-3 px-4">Current Stage</th>
                  <th className="py-3 px-4 text-end">Advance Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dossiers.map(d => (
                  <tr key={d.code} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-mono font-black text-red-600">{d.code}</td>
                    <td className="py-3 px-4">
                      <strong className="text-slate-900 block">{d.clientName}</strong>
                      <span className="text-slate-500">{d.companyEntity}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-slate-800 block">
                        {typeof d.serviceName === 'object' ? d.serviceName.en : d.serviceName}
                      </span>
                      <span className="text-slate-500 text-[11px]">{d.tier}</span>
                    </td>
                    <td className="py-3 px-4 tabular-nums">
                      <span className="font-black text-slate-900 block">${d.estimatedFeeUSD?.toLocaleString()} USD</span>
                      <span className="text-slate-500 text-[10px]">¥ {d.estimatedFeeRMB?.toLocaleString()} RMB</span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <span className="font-bold block">{d.slaDays} Days SLA</span>
                      <span className="text-[11px] text-slate-500">{d.assignedOfficer}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-800">
                        {d.stage}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-end">
                      <button
                        onClick={() => handleAdvanceDossierStage(d.code, d.stage)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow-xs flex items-center gap-1 ml-auto"
                      >
                        <span>Advance</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
