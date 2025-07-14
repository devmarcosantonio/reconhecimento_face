import React from 'react'
import WebCam from '../components/WebCam'
import { PhotoContext } from '../context/photoContext';
import { useForm } from 'react-hook-form';

type FormData = {
    nome: string;
    email: string;
    cpf: string;
};

export default function Cadastro() {
    const photoContext = React.useContext(PhotoContext);

    if (!photoContext) {
        throw new Error("PhotoContext must be used within a PhotoProvider");
    }

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSubmit = async (data: FormData) => {
        if (!photoContext.photo) {
            console.error("Nenhuma foto capturada");
            alert("Por favor, capture uma foto antes de cadastrar");
            return;
        }

        try {
            const formData = new FormData();
            formData.append("nome", data.nome);
            formData.append("email", data.email);
            formData.append("cpf", data.cpf);

            // Conversão mais limpa de base64 para Blob
            const response = await fetch(photoContext.photo);
            const blob = await response.blob();
            formData.append("foto", blob, "foto.jpg");

            // Substituir pela URL real da sua API
            const apiResponse = await fetch("http://localhost:3001/api/cadastro", {
                method: "POST",
                body: formData,
            });

            if (!apiResponse.ok) {
                throw new Error(`Erro HTTP: ${apiResponse.status}`);
            }

            const result = await apiResponse.json();
            console.log("Usuário cadastrado com sucesso:", result);
            alert("Usuário cadastrado com sucesso!");

            // Opcional: limpar foto após cadastro
            photoContext.setPhoto(null);

        } catch (error) {
            console.error("Erro ao cadastrar:", error);
            alert("Erro ao cadastrar usuário");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-light text-slate-800 mb-3">
                        Cadastro de Usuário
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Complete seus dados e capture uma foto para prosseguir
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Camera Section */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                            <h2 className="text-2xl font-light text-slate-800 mb-6 text-center">
                                Captura de Foto
                            </h2>
                            <WebCam w={320} h={240} />
                        </div>
                    </div>

                    {/* Form Section */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                            <h2 className="text-2xl font-light text-slate-800 mb-8 text-center">
                                Informações Pessoais
                            </h2>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex flex-col gap-6"
                            >
                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium text-slate-700 block"
                                        htmlFor="nome"
                                    >
                                        Nome Completo
                                    </label>
                                    <input
                                        id="nome"
                                        type="text"
                                        placeholder="Digite seu nome completo"
                                        {...register("nome", { required: "Nome é obrigatório" })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                                    />
                                    {errors.nome && (
                                        <span className="text-red-500 text-sm mt-1 block">
                                            {errors.nome.message}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium text-slate-700 block"
                                        htmlFor="email"
                                    >
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="Digite seu email"
                                        {...register("email", {
                                            required: "Email é obrigatório",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Email inválido"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm mt-1 block">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label
                                        className="text-sm font-medium text-slate-700 block"
                                        htmlFor="cpf"
                                    >
                                        CPF
                                    </label>
                                    <input
                                        id="cpf"
                                        type="text"
                                        placeholder="Digite seu CPF"
                                        {...register("cpf", {
                                            required: "CPF é obrigatório",
                                            pattern: {
                                                value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{11}$/,
                                                message: "CPF inválido (use formato: 000.000.000-00)"
                                            }
                                        })}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 text-slate-800 placeholder-slate-400"
                                    />
                                    {errors.cpf && (
                                        <span className="text-red-500 text-sm mt-1 block">
                                            {errors.cpf.message}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-lg hover:shadow-xl mt-8"
                                >
                                    Finalizar Cadastro
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
