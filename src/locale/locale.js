const getNavigatorLanguage = () => {
  if (process.env.REACT_APP_LOCALE === 'false') {
    return 'en-US';
  }

  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.language || 'en-US';
  }
};


const en = {
  common: {
    youAreLoggedInAs: 'You are logged in as',
    back: 'Back',
    cancel: 'Cancel',
  },
  dialog: {
    titleOk: 'Done',
    contentOk: 'Action completed successfully',
    titleFail: 'Failed',
    contentFail: 'Action failed during request',
    deleteAsk: 'Are you sure you want to delete this content?',
    close: 'Close',
    confirm: 'Confirm',
    delete: 'Delete',
    cancel: 'Cancel',
  },
  login: {
    head: 'Sign in',
    username: 'Username',
    password: 'Password',
    start: 'Sign in',
    spinner: 'Signing in...',
    failed: 'Bad credentials. Try again.',
  },
  admin: {
    layout: {
      dashboard: 'Dashboard',
      users: 'Users',
      lxc: 'LXC',
      logout: 'Logout',
      panel: 'Admin panel',
      profile: 'Profile',
      jobs: 'Jobs',
    },
    users: {
      addUser: 'Add user',
      username: 'Username',
      email: 'Email',
      password: 'Password',
      confirmPassword: 'Confirm password',
      roles: 'Roles',
      create: 'Create',
      delete: 'Delete',
      userList: 'User list',
      content: 'Content',
      details: {
        profile: 'Profile for username',
        me: 'My profile',
        edit: 'Edit',
        cancel: 'Cancel',
        update: 'Update',
        updatePassword: 'Update password',
      }
    },
    dashboard: {
      accountData: 'Account data',
      header: 'Header',
      content: 'Content',
    },
    lxc: {
      back: 'Back',
      addLxc: 'Add LXC',
      lxcList: 'LXC list',
      lxcName: 'Container name',
      lxcPort: 'Container port',
      address: 'IP address',
      lxcUsername: 'Container username',
      lxcPassword: 'Container password',
      create: 'Create',
      name: 'Name',
      owner: 'Owner username',
      unassigned: '-',
      info: 'Info',
      jobInfo: 'LXC create job submitted',
      close: 'Close',
      details: {
        header: 'LXC details',
        actions: {
          assign: 'Assing user to container',
          unassign: 'Unassign from container',
          start: 'Start container',
          stop: 'Stop container',
        },
        username: 'Username',
        assign: 'Assign',
        start: 'Start',
        stop: 'Stop',
        unassign: 'Unassign',
      }
    },
    jobs: {
      key: "Key",
      description: "Description",
      jobStatus: "Status",
      jobCode: "Code",
      startDate: "Started at",
      endDate: "Finished at",
      createdBy: "Started by",
      jobList: "Most recent jobs",
      next: "Next",
      prev: "Prev",
    },
  },
  user: {
    layout: {
      dashboard: 'Dashboard',
      profile: 'Profile',
      logout: 'Logout',
      panel: 'LXC',
      jobs: 'Jobs'
    },
    profile: {
      userProfile: 'User profile',
      content: 'Content',
    },
    dashboard: {
      accountData: 'Account data',
      header: 'Header',
      content: 'Content',
    }
  }
};

const pl = {
  common: {
    youAreLoggedInAs: 'Jesteś zalogowany jako',
    back: 'Wstecz',
    cancel: 'Anuluj',
  },
  login: {
    head: 'Zaloguj się',
    username: 'Login',
    password: 'Hasło',
    start: 'Zaloguj',
    spinner: 'Uwieżytelnianie...',
    failed: 'Niepoprawne dane. Spróbój ponownie.',
  },
  admin: {
    layout: {
      dashboard: 'Tablica',
      users: 'Użytkownicy',
      logout: 'Wyloguj',
      panel: 'Panel administratora',
    },
    list: {
      userList: 'Lista użytkowników',
      content: 'Zawartość',
    },
    dashboard: {
      accountData: 'Dane konta',
      header: 'Nagłówek',
      content: 'Zawartość',
    }
  },
  user: {
    layout: {
      dashboard: 'Tablica',
      profile: 'Profil',
      logout: 'Wyloguj',
      panel: 'Panel użytkownika',
    },
    profile: {
      userProfile: 'Profil użytkownika',
      content: 'Zawartość',
    },
    dashboard: {
      accountData: 'Dane konta',
      header: 'Nagłówek',
      content: 'Zawartość',
    }
  }
};

const lang = getNavigatorLanguage();
const t = lang === 'pl-PL' || lang === 'pl' ? pl : en;

export default t;