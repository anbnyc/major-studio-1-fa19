(async ()=>{
let data = await d3.json('data.json'); 
let app  = d3.select('#app');
let card = app.selectAll('div.met-image')
              .data(data)
              .join('div')
              .attr('class', 'met-image');

card.append('div')
    .attr('class', 'img-card')
    .append('img')
    .attr('src', (d)=>{ return 'images/' + d.filename} )
    .attr('width', '200');

card.append('h1')
    .text((d)=>{ return d.title});
})();