var ar_aluno = [];
var maximo = 0;
var minimo = 0;

fetch(`./ext/arquivs.txt`).then((res) =>
  res.text().then((data) => {
    const array = data.match(/[^\n]*\n*/gi);

    for (let i = 0; i < array.length - 1; i++) {
      let dados = array[i];

      const [aluno, rest] = dados.split(" ");

      ar_aluno.push(Number(aluno));
    }

    createTable(ar_aluno, "Aluno");
  })
);

function createTable(arr, nome) {
  const table = document.getElementById("myTable");
  const row1 = table.insertRow(1);
  const cell1 = row1.insertCell(0);
  const cell2 = row1.insertCell(1);
  const cell3 = row1.insertCell(2);
  const cell4 = row1.insertCell(3);
  const cell5 = row1.insertCell(4);
  const cell6 = row1.insertCell(5);
  const cell7 = row1.insertCell(6);
  const cell8 = row1.insertCell(7);
  const cell9 = row1.insertCell(8);
  const cell10 = row1.insertCell(9);
  const cell11 = row1.insertCell(10);
  const cell12 = row1.insertCell(11);

  cell1.classList.add("first");

  cell1.innerHTML = nome;
  cell2.innerHTML = getMedia(arr);
  cell3.innerHTML = getObj(getModa(arr));
  cell4.innerHTML = "ou o do index do meio, ou os 2 do meio dividido por 2";
  cell6.innerHTML = getMediaInterval(arr);
  cell5.innerHTML = getQuarti1(arr) + getQuarti3(arr) / 2;
  cell7.innerHTML = getQuarti1(arr);
  cell8.innerHTML = getQuarti3(arr);
  cell9.innerHTML = maximo;
  cell10.innerHTML = minimo;
  cell11.innerHTML = maximo - minimo;
  cell12.innerHTML = getSoma(arr);
}

function getSoma(arr) {
  let soma = 0;

  for (let i = 0; i < arr.length; i++) {
    soma += arr[i];
  }

  return soma;
}

function getMedia(arr) {
  let total = 0;

  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }

  return (total / arr.length).toFixed(2);
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
  return (arr[30] + arr[29]) / 2;
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
  maximo = max;
  minimo = min;

  return (max + min) / 2;
}

function getOrdered(inputarray) {
  return inputarray.sort(function (a, b) {
    return a - b;
  });
}

function getQuartis(arr, q) {
  const ordered = getOrdered(arr);
  const position = (ordered.length - 1) * q;
  const minimum = Math.floor(position);
  const rest = position - minimum;

  if (ordered[minimum + 1] !== undefined) {
    return ordered[minimum] + rest * (ordered[minimum + 1] - ordered[minimum]);
  } else {
    return ordered[minimum];
  }
}

function getQuarti1(array) {
  const q1 = getQuartis(array, 0.25);

  return q1;
}

function getQuarti3(array) {
  const q3 = getQuartis(array, 0.75);

  return q3;
}

function getObj(arr) {
  let teste = 0;
  let propof = "";
  for (let prop in arr) {
    if (teste < arr[prop]) {
      propof = prop;
      teste = arr[prop];
    } else if (teste == arr[prop]) {
      propof = propof + ", " + prop;
      teste = arr[prop];
    }
  }

  return propof;
}
