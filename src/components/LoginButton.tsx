'use client'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

export default function LoginButton() {
  const supabase = createClient()

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    })
  }

  return <Button onClick={handleLogin}>Login with GitHub</Button>
}

// Note pour le développeur :
// N'oubliez pas de configurer le fournisseur OAuth GitHub dans les paramètres
// de votre projet Supabase (Authentication > Providers) et d'ajouter
// l'URL de callback : VOTRE_URL_DE_SITE/auth/callback
