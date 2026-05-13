import { useState } from 'react';
import { Plus, School } from 'lucide-react';
import { MAX_OWNED_ORGS_COUNT } from '../config.ts';
import { useAppContext } from '../context.tsx';
import { OrganizationsSearch } from '../components/org/OrganizationsSearch.tsx';
import { OrganizationForm } from '../components/org/OrganizationForm.tsx';
import { MyOrganizationCard } from '../components/org/MyOrganizationCard.tsx';
import { useMyOrganizations } from '../hooks/queries/organization.ts';
import type { FormAction, MyOrganization } from '../entities';

export function OrganizationsPage() {
  const { user } = useAppContext();

  const [action, setAction] = useState<FormAction | null>(null);
  const [selectedOrgId, setSelectedOrgId] = useState<number | null>(null);
  const { data: myOrgs } = useMyOrganizations();
  const ownedOrgsCount = myOrgs.filter(org => org.role == 'OWNER').length;

  const openCreate = () => setAction('CREATE');
  const openEdit = (org: MyOrganization) => {
    setSelectedOrgId(org.id);
    setAction('EDIT');
  };
  const closeForm = () => {
    setSelectedOrgId(null);
    setAction(null);
  };

  return (
    <div className="min-h-full bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-white text-2xl font-bold mb-1">
            Добро пожаловать
            {user && `, ${user.fullname}`}!
          </h1>
          <p className="text-indigo-200 text-sm">Здесь вы можете создавать и искать организации</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {user && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Мои организации</h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  {ownedOrgsCount >= MAX_OWNED_ORGS_COUNT
                    ? 'Вы уже являетесь владельцем организации'
                    : 'Создайте свою организацию'}
                </p>
              </div>
              {!(ownedOrgsCount >= MAX_OWNED_ORGS_COUNT) && !(action === 'CREATE') && (
                <button
                  onClick={openCreate}
                  className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors shadow-sm"
                >
                  <Plus size={15} />
                  <p className="sm:hidden">Создать</p>
                  <p className="hidden sm:block">Создать организацию</p>
                </button>
              )}
            </div>
            {action && (
              <OrganizationForm
                org={myOrgs.find(o => o.id === selectedOrgId)}
                action={action}
                closeForm={closeForm}
              />
            )}
            <div className="grid gap-4 sm:grid-cols-2">
              {myOrgs.map(org => (
                <MyOrganizationCard openEdit={openEdit} key={org.id} org={org} />
              ))}
            </div>
            {myOrgs.length === 0 && (
              <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-10 text-center">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <School size={26} className="text-slate-400" />
                </div>
                <p className="text-slate-600 font-medium mb-1">
                  Вы ещё не состоите ни в одной организации
                </p>
                <p className="text-slate-400 text-sm">
                  Создайте свою или вступите в одну из организаций ниже
                </p>
                {!action && (
                  <button
                    onClick={openCreate}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    <Plus size={14} /> Создать организацию
                  </button>
                )}
              </div>
            )}
          </section>
        )}
        <OrganizationsSearch />
      </div>
    </div>
  );
}
