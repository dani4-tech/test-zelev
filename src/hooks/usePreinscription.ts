import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { FormData, PreinscriptionPayload, Status } from '../types/preinscription';
import { validateEmail, validatePhone, validatePassword } from '../utils/validation';
import { submitPreinscription } from '../api/mockApi';

export const usePreinscription = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '', lastName: '', email: '', phone: '',
    birthDate: '', program: '', password: '', terms: false
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!validateEmail(formData.email)) newErrors.email = "Email invalide.";
    if (!validatePhone(formData.phone)) newErrors.phone = "Téléphone invalide.";
    if (!validatePassword(formData.password)) newErrors.password = "Le mot de passe doit faire au moins 8 caractères.";
    if (!formData.terms) newErrors.terms = "Vous devez accepter les conditions.";
    if (!formData.program) newErrors.program = "Veuillez choisir un programme.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const payload: PreinscriptionPayload = {
        first_name: formData.firstName.trim(),
        last_name: formData.lastName.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        birth_date: formData.birthDate,
        program: formData.program,
        password: formData.password, // À ne jamais loguer en clair en production !
        terms_accepted: formData.terms,
      };

      await submitPreinscription(payload);
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', birthDate: '', program: '', password: '', terms: false });
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur inattendue est survenue.');
    }
  };

  const resetForm = () => setStatus('idle');

  return { formData, status, errorMessage, errors, handleChange, handleSubmit, resetForm };
};