MONSTERS = new URL('http://localhost:3000/monsters');
CURRENTPAGE = 1;

const monsterDiv = monster => {
  return `<div data-id='${monster.id}'>
            <h2>${monster.name}</h2>
            <h4>Age: ${monster.age}</h4>
            <p>Bio: ${monster.description}</p>
          </div>`;
}

const displayMonsters = (page=1) => {
  CURRENTPAGE = page;
  const params = {_limit: 50, _page: page};
  MONSTERS.search = new URLSearchParams(params);

  fetch(MONSTERS)
  .then(resp => resp.json())
  .then(monstersJSON => {
    document.getElementById('monster-container').innerHTML = monstersJSON.map(monster => monsterDiv(monster)).join('');
  });
}

document.addEventListener('DOMContentLoaded', e => {
  displayMonsters();

  document.getElementById('monster-form').addEventListener('submit', e => {
    e.preventDefault();
    fetch(MONSTERS, {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify({
        name: e.target.name.value,
        age: Nunmber(e.target.age.value),
        description: e.target.description.value
      })
    })
      .then(() => displayMonsters());

    e.target.reset();
  })

  const fwd = document.getElementById('forward');
  fwd.addEventListener('click', e => {
    displayMonsters(CURRENTPAGE + 1);
  })

  const back = document.getElementById('back');
  back.addEventListener('click', e => {
    if (CURRENTPAGE > 1) {
      displayMonsters(CURRENTPAGE - 1);
    }
  })
})
