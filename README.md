# Η σελίδα της VGS APP

Η παρουσίαση της VGS (πακέτα, τιμές, ασφάλεια, νομικά κείμενα, φόρμα για
παρουσίαση), έτοιμη για Vercel. Το «Independence» οδηγεί στο
https://vgs11.vercel.app/manos.

## Ανέβασμα
1. GitHub: νέο **Private** repository → «uploading an existing file» → σύρε
   όλο το περιεχόμενο αυτού του φακέλου → Commit.
2. Vercel: **Add New → Project** → Import το repository.
3. **Environment Variables**: `NEXT_PUBLIC_SUPABASE_URL` και
   `SUPABASE_SERVICE_ROLE_KEY` (για να δουλεύει η φόρμα).
4. **Deploy**.
