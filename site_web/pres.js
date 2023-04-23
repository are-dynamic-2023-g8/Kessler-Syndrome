
//Formule générale de Kesler 

function kessler(s0, d0, l, phi, gamma, delta, w, n, dt, tmax) {
    let t = 0;
    let t_list = [t];
    let s_list = [s0];
    let d_list = [d0];
    let s = s0;
    let d = d0;
    while (t < tmax) {
      t += dt;
      let sta = (1 - delta) * s + l;
      d = (1 - phi) * d + gamma * l + w * n * d * sta;
      s = (1 - w * d) * sta;
      s_list.push(s);
      d_list.push(d);
      t_list.push(t);
    }
    return [s_list, d_list, t_list];
  }

  //Graphe Kessler avec Plotly pour les modélisations 1.1 et 1.2

  function pl_kessler3(s1, d1, t1, s2, d2, s3, d3) {
    let y = t1.map(t => t / 365.0);
    ii = 1
    let trace1 = { x: y, y: s1, mode: 'lines', line: { color: 'red' }, name: "l = 1", hovertemplate: '<extra></extra>' };
    let trace2 = { x: y, y: s2, mode: 'lines', line: { color: 'green' }, name: "l = 3",hovertemplate: '<extra></extra>' };
    let trace3 = { x: y, y: s3, mode: 'lines', hovertemplate: '<extra></extra>', line: { color: 'blue' }, name: "l = 5",  };
    let data = [trace1, trace2, trace3];
    let layout = { title:{text:'Modélisation 1.1', font:{color:'Red'}}, legend:{font:{color:'White'}},
                   plot_bgcolor: 'antiquewhite', paper_bgcolor: 'linear-gradient(rgba(0,0,0,0.2),rgba(255,255,255,0.5))',
                   xaxis:{title:{text:'Temps(en années)',font:{color:'Black'}},
                   tickfont:{color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'},
                   yaxis:{title:{text: "Nombre de satellites",font:{color:'Black'}},
                   tickfont: {color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'}};
    Plotly.newPlot('plot11', data, layout, {scrollZoom: true,responsive:true});

    let trace4 = { x: y, y: d1, mode: 'lines', line: { color: 'red' }, name: "l = 1", hovertemplate: '<extra></extra>' };
    let trace5 = { x: y, y: d2, mode: 'lines', line: { color: 'green' }, name: "l = 3",hovertemplate: '<extra></extra>' };
    let trace6 = { x: y, y: d3, mode: 'lines', hovertemplate: '<extra></extra>', line: { color: 'blue' }, name: "l = 5",  };
    let data2 = [trace4, trace5, trace6];
    let layout2 = { title:{text:'Modélisation 1.2', font:{color:'Red'}}, legend:{font:{color:'White'}},
                   plot_bgcolor: 'antiquewhite', paper_bgcolor: 'linear-gradient(rgba(0,0,0,0.2),rgba(255,255,255,0.5))',
                   xaxis:{title:{text:'Temps(en années)',font:{color:'Black'}},
                   tickfont:{color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'},
                   yaxis:{title:{text: "Nombre de débris",font:{color:'Black'}},
                   tickfont: {color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'}};
    Plotly.newPlot('plot12', data2, layout2, {scrollZoom: true,responsive:true});
  }
  
  const l_list = [1,3,5];
  const r3 = [];
  for (let i = 0; i < l_list.length; i++) {
    const [s, d, t] = kessler(
      4550.0, // nombre de satellite en fonctionnement au début
      30521.0, // nombre de débris au début
      l_list[i], // taux de lancement par jour
      0.04 / 365.0, // taux de réentrées
      25, // les débris générés par le deuxième étage
      0.05 / 365.0, // taux de satellite qui deviennent des débris.
      1 * 10 ** (-8)/365, // taux de débris qui cause des collisions.
      300, // le nombre de débris causés par chaque collision.
      1, // l'écart de temps 1 = 1 jour 
      36500 * 3 // nombre de jour observé
    );
    r3.push([s, d, t]);
  };

  pl_kessler3(r3[0][0], r3[0][1],r3[0][2], r3[1][0],r3[1][1],r3[2][0],r3[2][1]);


  //Graphe Kessler avec Plotly pour les modélisations 2.1 et 2.2

  function pl_kessler2(s1, d1, t1, s2, d2, s3, d3) {
    let y = t1.map(t => t / 365.0);
    ii = 1
    let trace1 = { x: y, y: s1, mode: 'lines', line: { color: 'red' }, name: "gamma = 10", hovertemplate: '<extra></extra>' };
    let trace2 = { x: y, y: s2, mode: 'lines', line: { color: 'green' }, name: "gamma = 25",hovertemplate: '<extra></extra>' };
    let trace3 = { x: y, y: s3, mode: 'lines', hovertemplate: '<extra></extra>', line: { color: 'blue' }, name: "gamma = 100",  };
    let data = [trace1, trace2, trace3];
    let layout = { title:{text:'Modélisation 2.1', font:{color:'Red'}}, legend:{font:{color:'White'}},
                   plot_bgcolor: 'antiquewhite', paper_bgcolor: 'linear-gradient(rgba(0,0,0,0.2),rgba(255,255,255,0.5))',
                   xaxis:{title:{text:'Temps(en années)',font:{color:'Black'}},
                   tickfont:{color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'},
                   yaxis:{title:{text: "Nombre de satellites",font:{color:'Black'}},
                   tickfont: {color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'}};
    Plotly.newPlot('plot21', data, layout, {scrollZoom: true,responsive:true});

    let trace4 = { x: y, y: d1, mode: 'lines', line: { color: 'red' }, name: "gamma = 10", hovertemplate: '<extra></extra>' };
    let trace5 = { x: y, y: d2, mode: 'lines', line: { color: 'green' }, name: "gamma = 25",hovertemplate: '<extra></extra>' };
    let trace6 = { x: y, y: d3, mode: 'lines', hovertemplate: '<extra></extra>', line: { color: 'blue' }, name: "gamma = 100",  };
    let data2 = [trace4, trace5, trace6];
    let layout2 = { title:{text:'Modélisation 2.2', font:{color:'Red'}}, legend:{font:{color:'White'}},
                   plot_bgcolor: 'antiquewhite', paper_bgcolor: 'linear-gradient(rgba(0,0,0,0.2),rgba(255,255,255,0.5))',
                   xaxis:{title:{text:'Temps(en années)',font:{color:'Black'}},
                   tickfont:{color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'},
                   yaxis:{title:{text: "Nombre de débris",font:{color:'Black'}},
                   tickfont: {color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'}};
    Plotly.newPlot('plot22', data2, layout2, {scrollZoom: true,responsive:true});
  }
  
  const gamma_list = [10,25,100];
  const r2 = [];
  for (let i = 0; i < gamma_list.length; i++) {
    const [s, d, t] = kessler(
      4550.0, // nombre de satellite en fonctionnement au début
      30521.0, // nombre de débris au début
      3, // taux de lancement par jour
      0.04 / 365.0, // taux de réentrées
      gamma_list[i], // les débris générés par le deuxième étage
      0.05 / 365.0, // taux de satellite qui deviennent des débris.
      1 * 10 ** (-8)/365, // taux de débris qui cause des collisions.
      300, // le nombre de débris causés par chaque collision.
      1, // l'écart de temps 1 = 1 jour 
      36500 * 3 // nombre de jour observé
    );
    r2.push([s, d, t]);
  };

  pl_kessler2(r2[0][0], r2[0][1],r2[0][2], r2[1][0],r2[1][1],r2[2][0],r2[2][1]);
  
  //Graphe Kessler avec Plotly pour les modélisations 3.1 et 3.2

  function pl_kessler(s1, d1, t1, s2, d2, s3, d3) {
    let y = t1.map(t => t / 365.0);
    ii = 1
    let trace1 = { x: y, y: s1, mode: 'lines', line: { color: 'red' }, name: "w= 1 * 10 ** (-10)", hovertemplate: '<extra></extra>' };
    let trace2 = { x: y, y: s2, mode: 'lines', line: { color: 'green' }, name: "w= 0.2 * 10 ** (-10)",hovertemplate: '<extra></extra>' };
    let trace3 = { x: y, y: s3, mode: 'lines', hovertemplate: '<extra></extra>', line: { color: 'blue' }, name: "w= 1 * 10 ** (-12)",  };
    let data = [trace1, trace2, trace3];
    let layout = { title:{text:'Modélisation 3.1', font:{color:'Red'}}, legend:{font:{color:'White'}},
                   plot_bgcolor: 'antiquewhite', paper_bgcolor: 'linear-gradient(rgba(0,0,0,0.2),rgba(255,255,255,0.5))',
                   xaxis:{title:{text:'Temps(en années)',font:{color:'Black'}},
                   tickfont:{color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'},
                   yaxis:{title:{text: "Nombre de satellites",font:{color:'Black'}},
                   tickfont: {color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'}};
    Plotly.newPlot('plot31', data, layout, {scrollZoom: true,responsive:true});

    let trace4 = { x: y, y: d1, mode: 'lines', line: { color: 'red' }, name: "w= 1 * 10 ** (-10)", hovertemplate: '<extra></extra>' };
    let trace5 = { x: y, y: d2, mode: 'lines', line: { color: 'green' }, name: "w= 0.2 * 10 ** (-10)",hovertemplate: '<extra></extra>' };
    let trace6 = { x: y, y: d3, mode: 'lines', hovertemplate: '<extra></extra>', line: { color: 'blue' }, name: "w= 1 * 10 ** (-12)",  };
    let data2 = [trace4, trace5, trace6];
    console.log('plot31');
    let layout2 = { title:{text:'Modélisation 3.2', font:{color:'Red'}}, legend:{font:{color:'White'}},
                   plot_bgcolor: 'antiquewhite', paper_bgcolor: 'linear-gradient(rgba(0,0,0,0.2),rgba(255,255,255,0.5))',
                   xaxis:{title:{text:'Temps(en années)',font:{color:'Black'}},
                   tickfont:{color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'},
                   yaxis:{title:{text: "Nombre de débris",font:{color:'Black'}},
                   tickfont: {color:'Black'},gridcolor: "rgb(255,255,255)",
                   showspikes: true, spikemode: 'toaxis'}};
    Plotly.newPlot('plot32', data2, layout2, {scrollZoom: true,responsive:true});
  }
  
  const w_list = [1e-10, 0.2e-10, 1e-12];
  const r1 = [];
  for (let i = 0; i < w_list.length; i++) {
    const [s, d, t] = kessler(
      4550.0, // nombre de satellite en fonctionnement au début
      30521.0, // nombre de débris au début
      3, // taux de lancement par jour
      0.04 / 365.0, // taux de réentrées
      25, // les débris générés par le deuxième étage
      0.05 / 365.0, // taux de satellite qui deviennent des débris.
      w_list[i], // taux de débris qui cause des collisions.
      300, // le nombre de débris causés par chaque collision.
      1, // l'écart de temps 1 = 1 jour 
      36500 * 3 // nombre de jour observé
    );
    r1.push([s, d, t]);
  };

  pl_kessler(r1[0][0], r1[0][1],r1[0][2], r1[1][0],r1[1][1],r1[2][0],r1[2][1]);





  const scrollToTopButton = document.getElementById('scroll_haut');
    
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 250) {
      scrollToTopButton.style.display = 'block';
    } else {
      scrollToTopButton.style.display = 'none';
    }
  });
  
  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });



  const slideContainer = document.querySelector('.slideshow-inner');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');

  let slideIndex = 0;

  function showSlide(n) {
    if (n < 0) {
      slideIndex = slides.length - 1;
    } else if (n >= slides.length) {
      slideIndex = 0;
    } else {
      slideIndex = n;
    }

    slideContainer.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  function slidePrev() {
    showSlide(slideIndex - 1);
  }

  function slideNext() {
    showSlide(slideIndex + 1);
  }

  prevBtn.addEventListener('click', slidePrev);
  nextBtn.addEventListener('click', slideNext);






