import React from 'react';
import { usePreinscription } from '../hooks/usePreinscription';

const PreinscriptionForm: React.FC = () => {
  const { formData, status, errorMessage, errors, handleChange, handleSubmit, resetForm } = usePreinscription();

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100 text-center">
        <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Préinscription validée !</h2>
        <p className="text-gray-500 mb-8">Merci pour votre intérêt. Notre équipe va examiner votre dossier et vous contacter par email très prochainement.</p>
        <button onClick={resetForm} className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
          Retour au formulaire
        </button>
      </div>
    );
  }

  // Classes Tailwind réutilisables
  const inputClass = "w-full px-4 py-2.5 rounded-lg border bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1.5";

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Préinscription</h2>
        <p className="text-gray-500 mt-2">Remplissez ce formulaire pour réserver votre place.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Nom et Prénom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className={labelClass}>Prénom</label>
            <input id="firstName" name="firstName" type="text" required value={formData.firstName} onChange={handleChange} disabled={status === 'loading'} className={`${inputClass} ${errors.firstName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`} />
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>Nom</label>
            <input id="lastName" name="lastName" type="text" required value={formData.lastName} onChange={handleChange} disabled={status === 'loading'} className={`${inputClass} ${errors.lastName ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`} />
          </div>
        </div>

        {/* Email et Téléphone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="email" className={labelClass}>Email</label>
            <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange} disabled={status === 'loading'} className={`${inputClass} ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`} />
            {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>Téléphone</label>
            <input id="phone" name="phone" type="tel" required value={formData.phone} onChange={handleChange} disabled={status === 'loading'} placeholder="06 12 34 56 78" className={`${inputClass} ${errors.phone ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`} />
            {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>}
          </div>
        </div>

        {/* Date de naissance et Programme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="birthDate" className={labelClass}>Date de naissance</label>
            <input id="birthDate" name="birthDate" type="date" required value={formData.birthDate} onChange={handleChange} disabled={status === 'loading'} className={`${inputClass} border-gray-300 focus:ring-blue-200 focus:border-blue-500`} />
          </div>
          <div>
            <label htmlFor="program" className={labelClass}>Programme souhaité</label>
            <select id="program" name="program" required value={formData.program} onChange={handleChange} disabled={status === 'loading'} className={`${inputClass} ${errors.program ? 'border-red-500' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`}>
              <option value="">Sélectionnez...</option>
              <option value="license">Licence Informatique</option>
              <option value="master">Master Développement</option>
              <option value="bootcamp">Bootcamp Fullstack</option>
            </select>
            {errors.program && <p className="mt-1.5 text-xs text-red-600">{errors.program}</p>}
          </div>
        </div>

        {/* Mot de passe */}
        <div>
          <label htmlFor="password" className={labelClass}>Mot de passe</label>
          <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange} disabled={status === 'loading'} placeholder="Minimum 8 caractères" className={`${inputClass} ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'}`} />
          {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
        </div>

        {/* Conditions */}
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} disabled={status === 'loading'} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">J'accepte les conditions générales d'utilisation et la politique de confidentialité.</label>
            {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
          </div>
        </div>

        {/* Erreur globale API */}
        {status === 'error' && (
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <p className="text-sm text-red-700">{errorMessage}</p>
          </div>
        )}

        {/* Bouton Submit */}
        <div>
          <button type="submit" disabled={status === 'loading'} className="w-full flex justify-center items-center px-4 py-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all">
            {status === 'loading' ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Traitement en cours...
              </>
            ) : (
              'Valider ma préinscription'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreinscriptionForm;