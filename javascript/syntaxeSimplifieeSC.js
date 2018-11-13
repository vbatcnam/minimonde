'use strict'
/** 
	Petite bibliothèque qui facilite l'utilisation de sugarCubes
	
*/
SC.titreInfoEmise = SC.evt;

const g_AllSCevents = {}//Fabrique un événement par char

//Renvoie un événement chaque fois que on l’appelle avec le même char
function SCEVT(ps_nom) {
	if(g_AllSCevents[ps_nom] === undefined) {
		g_AllSCevents[ps_nom] = SC.evt(ps_nom)
	}
	return g_AllSCevents[ps_nom]
}

function parseInstr(ps_texte, pArrayS_nomInstr){
	// ps_methExtractionReste = 'reste' | 'nombre'
	for(let ls_nomInstr of pArrayS_nomInstr){
		if(ps_texte.startsWith(ls_nomInstr)){
			const ls_reste = ps_texte.substring(ls_nomInstr.length)
			const lArray_nombre = ps_texte.match(/\d+/g)
			return {instr: ls_nomInstr, reste: ls_reste, nombres: lArray_nombre}
		}
	}
	return false
}

//Permet de créer un cube en même temps que l'objet.
class SCCube extends SC.cube().constructor {
	constructor(...pArray_args) {
		super(null, null)
		if(! pArray_args.length) pArray_args = [{}]
		this.o = this
		this.evtKillInstance = SC.evt('kill instance')
		
		const lArray_methodes = Object.getOwnPropertyNames(this.__proto__)
		
		const lArray_prog = []
		for(let ls_nomMeth of lArray_methodes) {
			const pushWithKill = (pProg) => {
				this['kill_' + ls_nomMeth] = SC.evt('kill_' + ls_nomMeth)
				lArray_prog.push(
					SC.kill(
						SC.or(
							SCEVT('kill_' + this.constructor.name + '_' + ls_nomMeth),
							this['kill_' + ls_nomMeth]
						),
						pProg
					)
				)
			}
			
			if(ls_nomMeth.substring(0,1) == '$') {
				const {instr, reste, nombres} = parseInstr(ls_nomMeth, [
					'$actionForever_', '$repeat', '$on_', '$_', '$onNo_',
					'$const_', '$publicConst_',
					'$var_', '$publicVar_',
					'$property_', '$publicProperty_'
				])
				if(instr == '$actionForever_') {
					pushWithKill( SC.action(this[ls_nomMeth].bind(this), SC.forever) )
				}else if(instr == '$repeat'){
					const ln_nbFois = parseInt(nombres[0])
					pushWithKill(SC.repeat( ln_nbFois, ...this[ls_nomMeth]() ))
				}else if(instr == '$const_' || instr == '$publicConst_' || instr == '$var_' || instr == '$publicVar_'){
					const ls_nomVar = reste
					const lArray_args = (pArray_args[0][ls_nomMeth] == undefined)
							? []
							: pArray_args[0][ls_nomMeth]
					if(instr == '$const_' || instr == '$publicConst_'){
						this[ls_nomVar] = this[ls_nomMeth](...lArray_args)
					}else{
						this[ls_nomVar] = this[ls_nomMeth].bind(this, ...lArray_args)
					}
					if(instr == '$publicVar_' || instr == '$publicConst_'){
						pushWithKill(SC.generate(
							SCEVT(ls_nomVar),
							this[ls_nomVar],
							SC.forever
						))
					}
				}else if(instr == '$property_' || instr == '$publicProperty_'){
					const ls_nomProperty = reste
					const lArray_parts = this[ls_nomMeth]()
					this[ls_nomProperty] = this.defineProperty(...lArray_parts)
					pushWithKill(SC.repeat( SC.forever, this[ls_nomProperty] ))
					if(instr == '$publicProperty_'){
						pushWithKill(SC.generate(
							SCEVT(ls_nomProperty),
							this[ls_nomProperty].valeur,
							SC.forever
						))
					}
				}else if(instr == '$on_'){//uniquement avec undefined, SC.forever
					const ls_nomEvt = ls_nomMeth.match(/_[A-Za-z0-9]+(?=_)/g)[0].substring(1)
					pushWithKill(SC.actionOn(
						SCEVT(ls_nomEvt),
						(pArray_allEvt, pMachine)=>{
							const lArray_evt = pArray_allEvt[SCEVT(ls_nomEvt)]
							this[ls_nomMeth](lArray_evt, pMachine)
						},
						undefined,
						SC.forever
					))
				}else if(instr == '$onNo_'){//uniquement avec SC.NO_ACTION, SC.forever
					const ls_nomEvt = ls_nomMeth.match(/_[A-Za-z0-9]+(?=_)/g)[0].substring(1)
					pushWithKill(SC.actionOn(
						SCEVT(ls_nomEvt),
						SC.NO_ACTION,
						(pMachine)=>{
							this[ls_nomMeth]([], pMachine)
						},
						SC.forever
					))
				}else if(instr == '$_') {
					pushWithKill( this[ls_nomMeth]() )
				}
			}
		}
		
		this.p = SC.kill(SC.or(SCEVT('kill_' + this.constructor.name), this.evtKillInstance),
			SC.par(...lArray_prog)
		)
	}
}

//Crée un monde dans lequel sera mis tous les objets
var monde = SC.machine(30);
monde.addActor = monde.addProgram;