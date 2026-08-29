export const SALARIO_MINIMO_2026=1621;
export const TETO_INSS_2026=8475.55;
export const DEDUCAO_DEPENDENTE_2026=189.59;
export const DESCONTO_SIMPLIFICADO_2026=607.20;
export function inssEmpregado2026(salario:number){
 const s=Math.max(0,Math.min(salario,TETO_INSS_2026));
 const faixas=[[1621,0.075],[2902.84,0.09],[4354.27,0.12],[8475.55,0.14]] as const;
 let anterior=0,total=0;
 for(const [limite,aliq] of faixas){const base=Math.max(0,Math.min(s,limite)-anterior);total+=base*aliq;anterior=limite;if(s<=limite)break;}
 return Math.max(0,total);
}
export function irrf2026(rendimento:number,inss:number,dependentes=0){
 const dedLegal=Math.max(0,inss)+Math.max(0,dependentes)*DEDUCAO_DEPENDENTE_2026;
 const ded=Math.max(dedLegal,DESCONTO_SIMPLIFICADO_2026);
 const base=Math.max(0,rendimento-ded);
 let imposto=0;
 if(base>4664.68) imposto=base*.275-908.73;
 else if(base>3751.05) imposto=base*.225-675.49;
 else if(base>2826.65) imposto=base*.15-394.16;
 else if(base>2428.80) imposto=base*.075-182.16;
 imposto=Math.max(0,imposto);
 let reducao=0;
 if(rendimento<=5000) reducao=Math.min(imposto,312.89);
 else if(rendimento<=7350) reducao=Math.max(0,978.62-(.133145*rendimento));
 return {base,bruto:imposto,reducao:Math.min(imposto,reducao),imposto:Math.max(0,imposto-reducao),deducaoUsada:ded};
}
export const brl=(n:number)=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
