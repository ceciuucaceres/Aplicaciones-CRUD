document.addEventListener('DOMContentLoaded', function() {
  const docenteForm = document.getElementById('docenteForm');
  const docenteList = document.getElementById('docenteList');
  const nombreDocenteInput = document.getElementById('nombreDocente');

  let docentes = JSON.parse(localStorage.getItem('docentes')) || [];
  renderizarDocentes();

  docenteForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const nombreDocente = nombreDocenteInput.value.trim();

      if (nombreDocente !== '') {
          const nuevoDocente = {
              id: Date.now(),
              nombre: nombreDocente
          };
          docentes.push(nuevoDocente);
          guardarDocentesEnLocalStorage();
          renderizarDocentes();
            nombreDocenteInput.value = '';
      }
  });

  function renderizarDocentes() {
      // Limpiar el contenido existente de la tabla
      docenteList.innerHTML = '';

      // Recorrer cada docente y agregar una fila a la tabla por cada uno
      docentes.forEach(function(docente) {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${docente.id}</td>
              <td>${docente.nombre}</td>
              <td>
                  <button class="btn btn-sm btn-primary" onclick="editarDocente(${docente.id})">Editar</button>
                  <button class="btn btn-sm btn-danger" onclick="eliminarDocente(${docente.id})">Eliminar</button>
              </td>
          `;
          docenteList.appendChild(tr);
      });
  }

  function eliminarDocente(docenteId) {
      docentes = docentes.filter(function(docente) {
          return docente.id !== docenteId;
      });
      guardarDocentesEnLocalStorage();
      renderizarDocentes();
  }

  function guardarDocentesEnLocalStorage() {
      localStorage.setItem('docentes', JSON.stringify(docentes));
  }

  function editarDocente(docenteId) {
      const nuevoNombre = prompt('Ingrese el nuevo nombre del docente:');
      if (nuevoNombre !== null && nuevoNombre.trim() !== '') {
          const docenteIndex = docentes.findIndex(docente => docente.id === docenteId);
          if (docenteIndex !== -1) {
              docentes[docenteIndex].nombre = nuevoNombre.trim();
              guardarDocentesEnLocalStorage();
              renderizarDocentes();
          }
      }
  }
});
