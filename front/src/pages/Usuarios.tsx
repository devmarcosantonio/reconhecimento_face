import React from 'react'
import Table from '../components/Table'

export default function Usuarios() {
  const data = React.useMemo(() => [
    {
      nome: 'João Silva',
      email: 'joao@example.com',
      cpf: '123.456.789-00',
    },
    {
      nome: 'Maria Oliveira',
      email: 'maria@example.com',
      cpf: '987.654.321-00',
    },
  ], []);
  const columns = React.useMemo(() => [
    {
      header: 'Nome',
      accessorKey: 'nome',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'CPF',
      accessorKey: 'cpf',
    },
  ], []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-slate-800 mb-3">
            Gerenciamento de Usuários
          </h1>
          <p className="text-slate-600 text-lg">
            Visualize e gerencie todos os usuários cadastrados
          </p>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-light text-slate-800 mb-2">
              Lista de Usuários
            </h2>
            <p className="text-slate-600">
              {data.length} usuário{data.length !== 1 ? 's' : ''} cadastrado{data.length !== 1 ? 's' : ''}
            </p>
          </div>

          <Table
            data={data}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
}

