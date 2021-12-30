console.clear()
const doc = document
let count  = doc.getElementById('num')
let temper = doc.getElementById('temp')
let count_text  = doc.getElementById('num_text')
let temper_text = doc.getElementById('temp_text')

gether = () => {

	num_text.innerHTML = `Количество: ${count.value}`
	temper_text.innerHTML = ` Максимальная мера хаоса(темература): ${temper.value}`
	if(count.value >= 250)
	{
		num_text.innerHTML += ` <span style="color:red">Вот это уже рисковано, может не выдержать.</span>`
	}

}

doc.addEventListener("DOMContentLoaded", gether());

start = () => {
	simulation(count.value,temper.value)
}

simulation = (cunt, sped) => {
	console.log(cunt,sped)
	const count = cunt
	const speed = sped


	const list = []
	const size = {
		width: window.innerWidth - 20,
		height: window.innerHeight - 30
	}
	const random = (derivative) => {
		return Math.round(Math.random()*derivative)
	}

	function atom (X,Y,Vx,Vy,id,q=0,col=null) {
		
		this.position = {
			X:X,
			Y:Y
		}
		this.velocity = {
			X:Vx,
			Y:Vy
		}
		
		this.element = doc.createElement('div')
		this.element.className = 'atom'
		this.element.id = id

		this.q = q

		doc.body.append(this.element)
		if(col) this.element.style.color = '#' + col
		this.move = () => {
			this.element.style.left = this.position.X + 'px'
			this.element.style.top  = this.position.Y + 'px'

			if(this.velocity.X > 10) this.velocity.X = 10
			if(this.velocity.X < -10) this.velocity.X = -10
			if(this.velocity.Y > 10) this.velocity.Y = 10
			if(this.velocity.Y < -10) this.velocity.Y = -10
			
			this.position.X += this.velocity.X
			this.position.Y += this.velocity.Y
			
			if(this.position.X < 20)
			{
				this.velocity.X = -this.velocity.X
				this.position.X = 20
			}
			if(this.position.X > size.width-20)
			{
				this.velocity.X = -this.velocity.X
				this.position.X = size.width-20
			}
			if(this.position.Y < 20)
			{
				this.velocity.Y = -this.velocity.Y
				this.position.Y = 20
			}
			if(this.position.Y > size.height-20)
			{
				this.velocity.Y = -this.velocity.Y
				this.position.Y = size.height-20
			}
		}
	}
	const createAtom = ( X,Y,Vx,Vy,id,q,col=null) => {
		let b = new atom(X,Y,Vx,Vy,id,q,col)
		b.move()
		return b
	}
	for(i=1;i<=count;i++)
	{	
		let e = createAtom(random(size.width),random(size.height),random(speed)-random(speed),random(speed)-random(speed),i,random(speed) - random(speed))
		list.push(e)
	}
	let loop = setInterval(() => {
		list.forEach(e => e.move())
		for(i in list)
		{
			let c = list
			c.slice(i).forEach(e => {
				if(!c[i]) return
				if(c[i] == e) return

				let rX = e.position.X - c[i].position.X
				let rY = e.position.Y - c[i].position.Y
				let r = Math.sqrt((rX**2) + (rY**2))
				
				if(r<=40)
				{
					let F = (Math.abs(c[i].q * e.q) / r**2) / 1000
					let alpha = Math.asin(rX/r)
					let gamma = Math.acos(rY/r)

					e.velocity.X += F*2+Math.sin(alpha)
					e.velocity.Y += F*2+Math.cos(gamma)

					c[i].velocity.X -= F*2+Math.sin(alpha)
					c[i].velocity.Y -= F*2+Math.cos(gamma)
				} else return

			})
		}
	},25)
	doc.addEventListener('keydown', e => {
		if(e.key == 'q' || e.key == 'й') clearInterval(loop)
	})

}