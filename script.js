const data = {
  modules: [
    {
      id: 1,
      name: 'Users',
      features: ['profile', 'view-users', 'edit-users', 'delete-user'],
    },
    { id: 2, name: 'Reports', features: ['view-reports', 'edit-reports'] },
  ],
  roles: [
    {
      id: 1,
      name: 'Admin',
      permissions: [
        'profile',
        'view-users',
        'edit-users',
        'delete-user',
        'view-reports',
        'edit-reports',
      ],
    },
  ],
  users: [
    {
      id: 1,
      name: 'Sushant',
      roleId: 1,
    },
  ],
};

// Helper functions
const renderModules = () => {
  const moduleCards = document.getElementById('moduleCards');
  moduleCards.innerHTML = '';
  data.modules.forEach((module) => {
    const card = document.createElement('div');
    card.className = 'border p-4 rounded shadow';
    card.innerHTML = `
      <h3 class="font-semibold text-xl mb-2">Module Name: ${module.name}</h3>
      <ul id="features-${module.id}" class="mb-4">
        ${module.features
          .map(
            (f) =>
              `<li class="p-2 border border-slate-600 mb-2 rounded-2xl">${f}</li>`
          )
          .join('')}
      </ul>
      <input type="text" placeholder="New Feature" autocomplete="off" class="border border-gray-600 px-2 py-1 rounded mb-4 bg-slate-700 text-sm">
      <button onclick="addFeature(${
        module.id
      }, this)" class="ml-2 px-4 py-1 text-white bg-blue-700 rounded-md">Add Feature</button>
    `;
    moduleCards.appendChild(card);
  });
};

const addFeature = (moduleId, button) => {
  const featureName = button.previousElementSibling.value;
  const module = data.modules.find((m) => m.id === moduleId);
  if (featureName && module) {
    module.features.push(featureName);
    renderModules();
  }
};

const renderRoles = () => {
  const roleSelect = document.getElementById('roleSelect');
  const userRoleSelect = document.getElementById('userRoleSelect');
  roleSelect.innerHTML = `<option value="0">Select Role</option>`;
  userRoleSelect.innerHTML = `<option value="0">Select Role for User</option>`;
  data.roles.forEach((role) => {
    const option = document.createElement('option');
    option.value = role.id;
    option.textContent = role.name;
    roleSelect.appendChild(option);
    userRoleSelect.appendChild(option.cloneNode(true));
  });
};

const addRole = () => {
  const roleName = document.getElementById('roleNameInput').value;
  if (roleName) {
    data.roles.push({
      id: data.roles.length + 1,
      name: roleName,
      permissions: [],
    });
    renderRoles();
    showData();
    alert(`New Role, ${roleName} added.`);
  }
};

const showRoleFeatures = () => {
  const roleId = parseInt(document.getElementById('roleSelect').value);
  const role = data.roles.find((r) => r.id === roleId);
  const roleFeaturesDiv = document.getElementById('roleFeatures');
  if (roleId == '0') {
    roleFeaturesDiv.innerHTML = '';
  }
  if (role) {
    roleFeaturesDiv.innerHTML = data.modules
      .map(
        (module) => `
      <h4 class="font-semibold">${module.name}</h4>
      <ul>
        ${module.features
          .map(
            (feature) => `
          <li>
            <label>
              <input type="checkbox" onchange="toggleFeature(${
                role.id
              }, '${feature}')" ${
              role.permissions.includes(feature) ? 'checked' : ''
            }> 
              ${feature}
            </label>
          </li>`
          )
          .join('')}
      </ul>
    `
      )
      .join('');
  }
  showData();
};

const toggleFeature = (roleId, feature) => {
  const role = data.roles.find((r) => r.id === roleId);
  if (role) {
    if (role.permissions.includes(feature)) {
      role.permissions = role.permissions.filter((f) => f !== feature);
    } else {
      role.permissions.push(feature);
    }
    showRoleFeatures();
  }
};

const renderUsers = () => {
  const userSelect = document.getElementById('userSelect');
  userSelect.innerHTML = `<option value="0">Select User</option>`;
  data.users.forEach((user) => {
    const option = document.createElement('option');
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
  });
};

const addUser = () => {
  const userName = document.getElementById('userNameInput').value;
  const roleId = parseInt(document.getElementById('userRoleSelect').value);
  if (userName && roleId) {
    data.users.push({ id: data.users.length + 1, name: userName, roleId });
    renderUsers();
    alert(`New User, ${userName} added.`);
    showData();
  }
};

const showUserAccess = () => {
  const userId = parseInt(document.getElementById('userSelect').value);
  const user = data.users.find((u) => u.id === userId);
  const userAccessDiv = document.getElementById('userAccess');
  userAccessDiv.innerHTML = `
  <h4 id="user-name" class="font-semibold mb-2"></h4>
    <ul class="mb-4">
    <li id="profile" class="p-2 border border-slate-600 mb-2 rounded-2xl hidden">if(profile)</li>
      <li id="view-users" class="p-2 border border-slate-600 mb-2 rounded-2xl hidden">if(view-users)</li>
      <li id="edit-users" class="p-2 border border-slate-600 mb-2 rounded-2xl hidden">if(edit-users)</li>
      <li id="delete-user" class="p-2 border border-slate-600 mb-2 rounded-2xl hidden">if(delete-user)</li>
      <li id="view-reports" class="p-2 border border-slate-600 mb-2 rounded-2xl hidden">if(view-reports)</li>
      <li id="edit-reports" class="p-2 border border-slate-600 mb-2 rounded-2xl hidden">if(edit-reports)</li>
    </ul>
  `;
  if (user) {
    const role = data.roles.find((r) => r.id === user.roleId);
    const username = document.getElementById('user-name');
    username.innerHTML = `
      Modules & Features for ${user.name} (${role.name})
      <br>
      <p class="py-2">${JSON.stringify(role.permissions)}</p>
    `;

    if (role.permissions.includes('profile')) {
      document.getElementById('profile').classList.remove('hidden');
    }

    if (role.permissions.includes('view-users')) {
      document.getElementById('view-users').classList.remove('hidden');
    }
    if (role.permissions.includes('edit-users')) {
      document.getElementById('edit-users').classList.remove('hidden');
    }
    if (role.permissions.includes('delete-user')) {
      document.getElementById('delete-user').classList.remove('hidden');
    }
    if (role.permissions.includes('view-reports')) {
      document.getElementById('view-reports').classList.remove('hidden');
    }
    if (role.permissions.includes('edit-reports')) {
      document.getElementById('edit-reports').classList.remove('hidden');
    }
  }
};

function showData() {
  const dataDiv = document.getElementById('dataDisplay');
  dataDiv.innerHTML = '';
  dataDiv.innerHTML = JSON.stringify(data, null, 2);
}

// Initial render
renderModules();
renderRoles();
renderUsers();
showData();
