import {NextResponse} from 'next/server';
import {getAudienceData} from '../../lib/ga4';

export const dynamic='force-dynamic';
export const revalidate=0;

export async function GET(){
  const data=await getAudienceData();
  return NextResponse.json(data,{
    headers:{
      'Cache-Control':'no-store, max-age=0',
      'X-Robots-Tag':'noindex, nofollow, noarchive'
    }
  });
}
