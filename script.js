var ar_aluno = [];
var ar_curso = [];
var ar_idade = [];
var ar_peso = [];
var ar_altura = [];
var ar_periodo = [];

fetch(`./ext/arquivs.txt`).then((res) =>
  res.text().then((data) => {
    const array = data.match(/[^\n]*\n*/gi);

    for (let i = 0; i < array.length - 1; i++) {
      let dados = array[i];

      const [aluno, idade, peso, altura, periodo] = dados.split(" ");

      ar_aluno.push(Number(aluno));
      ar_idade.push(Number(idade));
      ar_peso.push(Number(peso));
      ar_altura.push(Number(altura.replace(/,/g, ".")));
      ar_periodo.push(Number(periodo));
    }

    createTable(ar_altura, "Altura");
    createTable(ar_idade, "Idade");
    createTable(ar_peso, "Peso");
    createTable(ar_periodo, "Periodo");
  })
);

function createTable(arr, nome) {
  const table = document.getElementById("myTable");
  const row1 = table.insertRow(3);
  const cell1 = row1.insertCell(0);
  const cell2 = row1.insertCell(1);
  const cell3 = row1.insertCell(2);
  const cell4 = row1.insertCell(3);
  const cell5 = row1.insertCell(4);
  const cell6 = row1.insertCell(5);

  cell1.innerHTML = nome;
  cell2.innerHTML = getMedia(arr).toFixed(2);
  cell3.innerHTML = getObj(getModa(arr));
  cell4.innerHTML = getMediana(arr);
  cell6.innerHTML = getMediaInterval(arr);
  cell5.innerHTML = getMediaPosi(arr);
}

function getMedia(arr) {
  let total = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    total += arr[i];
  }

  return total / arr.length;
}

function getModa(arr) {
  counts = {};
  arr.forEach(function (e) {
    if (counts[e] === undefined) {
      counts[e] = 0;
    }
    counts[e] += 1;
  });

  return counts;
}

function getMediana(arr) {
  return (arr[29] + arr[30]) / 2;
}

function getMediaInterval(arr) {
  let max = 0;
  let min = 1000;

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }

    if (arr[i] < min) {
      min = arr[i];
    }
  }

  return (max + min) / 2;
}

function Array_Sort_Numbers(inputarray) {
  return inputarray.sort(function (a, b) {
    return a - b;
  });
}

const quantile = (arr, q) => {
  const sorted = Array_Sort_Numbers(arr);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) {
    return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  } else {
    return sorted[base];
  }
};

function getMediaPosi(array) {
  const q1 = quantile(array, 0.25);
  const q3 = quantile(array, 0.75);

  return (q1 + q3) / 2;
}

function getObj(arr) {
  let teste = 0;
  let propof = "";
  for (let prop in arr) {
    if (teste < arr[prop]) {
      propof = prop;
      teste = arr[prop];
    } else if (teste == arr[prop]) {
      propof = propof + "," + prop;
      teste = arr[prop];
    }
  }

  return propof;
}
