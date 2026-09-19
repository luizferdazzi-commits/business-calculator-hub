'use client';
import type{ReactNode}from'react';

declare global{interface Window{gtag?:(...args:any[])=>void}}

export default function TrackedOutboundLink({href,partner,placement,children,className}:{href:string;partner:string;placement:string;children:ReactNode;className?:string}){
 const click=()=>window.gtag?.('event','partner_outbound_click',{partner,placement,page_path:window.location.pathname,link_url:href,transport_type:'beacon'});
 return <a href={href} target="_blank" rel="nofollow sponsored noopener" onClick={click} className={className}>{children}</a>
}