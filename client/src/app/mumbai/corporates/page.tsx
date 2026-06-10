// /mumbai/corporates → redirect to /mumbai/corporate
// This alias exists because both URL patterns are used in practice.
import { redirect } from 'next/navigation';

export default function MumbaiCorporatesAlias() {
  redirect('/mumbai/corporate');
}
