'use strict'

const g_AllSCevents = {}
const g_AllSCsensors = {}
const g_AllProperty = {}

function SCEVT(ps_nom) {
	if(g_AllSCevents[ps_nom] === undefined) {
		g_AllSCevents[ps_nom] = SC.evt(ps_nom)
	}
	return g_AllSCevents[ps_nom]
}

function SCSENSOR(ps_nom) {
	if(g_AllSCsensors[ps_nom] === undefined) {
		g_AllSCsensors[ps_nom] = SC.sensor(ps_nom)
	}
	return g_AllSCsensors[ps_nom]
}

const F = {}
F.idem = (val, pArray_valEnvoyees)=>val
F.count = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>acc+1, 0)
F.sum = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>acc+curr, 0)
F.product = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>acc*curr, 1)
F.min = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>Math.min(acc,curr), Infinity)
F.max = (val, pArray_valEnvoyees)=>(pArray_valEnvoyees || []).reduce((acc, curr)=>Math.max(acc,curr), -Infinity)

function createCreateurCube(pFunc_createur) {
	return function(...args) {
		// création du cube basique
		//-------------------------
		const newObj = new pFunc_createur(...args)
		const newCube = SC.cube(null, null)
		newCube.o = newCube
		Object.assign(newCube, newObj)
		Object.getOwnPropertyNames(newObj.__proto__).forEach(function(property){
			newCube[property] = newObj.__proto__[property]
		})
		
		// traitement des méthodes actives
		//--------------------------------
		let lArray_methodes = Object.getOwnPropertyNames(newObj)
		lArray_methodes = lArray_methodes.concat(Object.getOwnPropertyNames(newObj.__proto__))
		
		const lArray_prog = []
		for(let indexAttr of lArray_methodes) {
			// console.log(indexAttr)
			const attr = newCube[indexAttr]
			if (indexAttr === 'o') continue
			if (attr && attr.constructor
					&& attr.constructor.name.startsWith
					&& attr.constructor.name.startsWith('SC_')
					&& indexAttr.startsWith('$_')) {
				lArray_prog.push(attr)
			}
		}
		newCube.p = SC.par(...lArray_prog)
		//~ console.log(newCube.p.toString())
		return newCube
	}
}

function createCube(pFunc_createur) {
	return createCreateurCube(pFunc_createur)()
}

function createAjouteurCube(pFunc_createur) {
	return function(p_machine, ...args) {
		
	}
}

function actionForever(pFunc_method) {
	return SC.action(pFunc_method, SC.forever)
}

function and(...pArray) {
	if (pArray.length === 1) {
		return pArray[0]
	}else{
		return SC.and(...pArray)
	}
}

function doUntil(pObj_prog) {
	const lProg_then = pObj_prog.then || SC.nothing()
	return SC.kill(
		pObj_prog.until,
		pObj_prog.do,
		lProg_then,
	)
}

function repeatUntil(pObj_prog) {
	return doUntil({
		do: SC.repeat(SC.forever,
			pObj_prog.repeat
		),
		until: pObj_prog.until,
		then: pObj_prog.then,
	})
}

function actionOnForever(pArrayS_nomEvt, pFunc_action) {
	// pFunc_action(pArray_evt1,...,pArray_evtN)
	return SC.actionOn(
		and(...pArrayS_nomEvt.map(SCEVT)),
		function(pArray_allEvt, p_machine) {
			//~ console.log('dddd---->', pArray_allEvt)
			const lArrayArray_evt = pArrayS_nomEvt.map(   ls_nomEvt  =>  pArray_allEvt[SCEVT(ls_nomEvt)]   )
			pFunc_action(...lArrayArray_evt.concat([p_machine]))
		},
		undefined,
		SC.forever
	)
}

function actionIfAllEvent(pArrayS_nomEvt, pFunc_action, pn_nbreFois) {
	// pFunc_action(pArray_evt1,...,pArray_evtN)
	return SC.actionOn(
		and(...pArrayS_nomEvt.map(SCEVT)),
		function(pArray_allEvt, p_machine) {
			//~ console.log('dddd---->', pArray_allEvt)
			const lArrayArray_evt = pArrayS_nomEvt.map(   ls_nomEvt  =>  pArray_allEvt[SCEVT(ls_nomEvt)]   )
			pFunc_action(...lArrayArray_evt.concat([p_machine]))
		},
		undefined,
		pn_nbreFois
	)
}

function createProperty(p_initVal, pArrayS_nomEvtInfluenceurs, pFunc_influence) {
	// function pFunc_influence(p_val, ...pArray_valEnvoyees)
	const symb = Symbol()
	g_AllProperty[symb] = p_initVal;
	const lCell = SC.cell({
		target: g_AllProperty,
		field: symb,
		sideEffect: (val, evts)=>{
			const lArray_evts = pArrayS_nomEvtInfluenceurs.map(ps_evt=>evts[SCEVT(ps_evt)])
			const l_ret = pFunc_influence(val, ...lArray_evts)
			return l_ret
		},
		eventList: pArrayS_nomEvtInfluenceurs.map(SCEVT)
	})
	lCell.valeur = ()=>lCell.val()
	lCell.genre = 'property'
	return lCell
}

function delayEvent(pn_delayMilliSec, ps_evt) {
	return function(m) {
		m.listPromesse = m.listPromesse || []
		m.listResolve = m.listResolve || []
		m.listPromesse[ps_evt] = new Promise(resolve=>{
			m.listResolve[ps_evt] = resolve
		})
		setTimeout(
			function() {
				m.generateEvent(SCEVT(ps_evt))
				if (m.listPromesse[ps_evt]) m.listResolve[ps_evt]()
			}
			,
			pn_delayMilliSec
		)
	}
}

function installContext(p_machine, ps_nomContexte, p_targetOrDelayOrPass, pObj_timingReact) {
	if (ps_nomContexte === 'requestAnimationFrame') {
		let ln_pass = 0
		function lFunc_rafHandler(pTimestamp_momentLancementExecDesRaf) {
			ln_pass += 1
			if (ln_pass % p_targetOrDelayOrPass === 0) {
				p_machine.generateEvent(SCEVT('displayTime'))
				p_machine.react()
			}
			requestAnimationFrame( lFunc_rafHandler )
		}
		requestAnimationFrame( lFunc_rafHandler )
	} else if (ps_nomContexte === 'timeout') {
		
	} else if (ps_nomContexte === 'interval') {
		let ln_nombreInterval = 0
		const lTimer = setInterval(async function() {
			ln_nombreInterval += 1
			for (let i = 0; i < pObj_timingReact.nbReact; i++){
				p_machine.react()
			}
			// if(ln_nombreInterval > 10) clearInterval(lTimer)
		}, p_targetOrDelayOrPass)
	} else {
		p_targetOrDelayOrPass.addEventListener(ps_nomContexte, async function(evt) {
			// console.log(ps_nomContexte)
			p_machine.generateEvent(SCEVT(ps_nomContexte), evt)
			for (let i=0; i < pObj_timingReact.nbReact; i++) {
				p_machine.react()
			}
			if (pObj_timingReact.wait !== undefined) {
				await p_machine.listPromesse[pObj_timingReact.wait]
				for (let i=0; i < pObj_timingReact.nbReactSuppl; i++) {
					p_machine.react()
				}
			}
		})
	}
}

async function wait(pn_millisec) {
	return new Promise(resolve => setTimeout(resolve, pn_millisec))
}

SC.machine().constructor.prototype.addActor = function(pProgramme) {
	if(pProgramme.init) pProgramme.init(this)
	this.addProgram(pProgramme)
}
