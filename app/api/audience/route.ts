import {NextResponse} from 'next/server';
import {getAudienceData} from '../../lib/ga4';
import {audienceSnapshot} from '../../data/audience';

export const dynamic='force-dynamic';
export const revalidate=0;

const timeout=<T,>(promise:Promise<T>,ms:number)=>Promise.race<T>([
  promise,
  new Promise<T>((_,reject)=>setTimeout(()=>reject(new Error(`Audience request exceeded ${ms}ms`)),ms))
]);

export async function GET(){
  let data:any;
  try{
    data=await timeout(getAudienceData(),12000);
  }catch(e){
    console.error('Audience API timeout fallback',e);
    data={...audienceSnapshot,liveNow:null,source:'Fallback snapshot',error:'Live analytics temporarily unavailable'};
  }
  return NextResponse.json(data,{
    headers:{
      'Cache-Control':'public, s-maxage=60, stale-while-revalidate=300',
      'X-Robots-Tag':'noindex, nofollow, noarchive'
    }
  });
}
