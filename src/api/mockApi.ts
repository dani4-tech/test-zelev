import type { PreinscriptionPayload } from '../types/preinscription';

// Il doit y avoir le mot-clé "export" ici :
export const submitPreinscription = async (payload: PreinscriptionPayload): Promise<void> => {
  console.log("Payload envoyé à l'API (simulé) :", payload);
  
  // Simule une latence réseau
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Simulation d'une erreur aléatoire (20% du temps)
  const shouldFail = Math.random() < 0.2;
  if (shouldFail) {
    throw new Error("Le serveur fictif a refusé la connexion.");
  }
};