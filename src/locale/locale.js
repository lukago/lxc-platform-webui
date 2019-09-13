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
    spinner: 'Signing in',
    failed: 'Bad credentials. Try again',
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
      oldPassword: 'Current password',
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
          assign: 'Assign user to container',
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
    youAreLoggedInAs: 'Zalogowano jako',
    back: 'Cofnij',
    cancel: 'Anuluj',
  },
  dialog: {
    titleOk: 'Zakończ',
    contentOk: 'Akcja zakończona pozytywnie',
    titleFail: 'Błąd',
    contentFail: 'Akcja nie powiodła się',
    deleteAsk: 'Na pewno?',
    close: 'Zamknij',
    confirm: 'Potwierdź',
    delete: 'Usuń',
    cancel: 'Anuluj',
  },
  login: {
    head: 'Zaloguj się',
    username: 'Login',
    password: 'Hasło',
    start: 'Zaloguj',
    spinner: 'Uwierzytelnianie',
    failed: 'Niepoprawne dane. Spróbuj ponownie',
  },
  admin: {
    layout: {
      dashboard: 'Panel główny',
      users: 'Użytkownicy',
      lxc: 'LXC',
      logout: 'Wyloguj',
      panel: 'Panel administratora',
      profile: 'Profil',
      jobs: 'Zadania',
    },
    users: {
      addUser: 'Dodaj użytkownika',
      username: 'Nazwa',
      email: 'Email',
      oldPassword: 'Obecne hasło',
      password: 'Hasło',
      confirmPassword: 'Potwierdź hasło',
      roles: 'Role',
      create: 'Utwórz',
      delete: 'Usuń',
      userList: 'Lista użytkowników',
      content: 'Treść',
      details: {
        profile: 'Profil użytkownika',
        me: 'Mój profil',
        edit: 'Edytuj',
        cancel: 'Anuluj',
        update: 'Aktualizuj',
        updatePassword: 'Aktualizuj hasło',
      }
    },
    dashboard: {
      accountData: 'Dane konta',
      header: 'Nagłówek',
      content: 'Treść',
    },
    lxc: {
      back: 'Cofnij',
      addLxc: 'Dodaj LXC',
      lxcList: 'Lista LXC',
      lxcName: 'Nazwa',
      lxcPort: 'Port',
      address: 'Adres IP',
      lxcUsername: 'Nazwa użytkownika do kontenera',
      lxcPassword: 'Hasło do kontenera',
      create: 'Utwórz',
      name: 'Nazwa',
      owner: 'Nazwa właściciela',
      unassigned: '-',
      info: 'Informacje',
      jobInfo: 'Zgłoszono zlecenie stworzenia kontenera',
      close: 'Zamknij',
      details: {
        header: 'Detale kontenera',
        actions: {
          assign: 'Przypisz użytkownika do kontenera',
          unassign: 'Wypisz użytkownika z kontenera',
          start: 'Włącz kontener',
          stop: 'Wyłącz kontener',
        },
        username: 'Nazwa',
        assign: 'Przypisz',
        start: 'Włącz',
        stop: 'Wyłącz',
        unassign: 'Wypisz',
      }
    },
    jobs: {
      key: "Klucz",
      description: "Opis",
      jobStatus: "Status",
      jobCode: "Kod",
      startDate: "Rozpoczęta o",
      endDate: "Zakończona o",
      createdBy: "Rozpoczęta przez",
      jobList: "Ostatnie zadania",
      next: "Następna",
      prev: "Poprzednia",
    },
  },
  user: {
    layout: {
      dashboard: 'Panel główny',
      profile: 'Profil',
      logout: 'Wyloguj',
      panel: 'LXC',
      jobs: 'Zadania'
    },
    profile: {
      userProfile: 'Profil użytkownika',
      content: 'Treść',
    },
    dashboard: {
      accountData: 'Dane konta',
      header: 'Nagłówek',
      content: 'Treść',
    }
  }
};

const lang = getNavigatorLanguage();
const t = lang === 'pl-PL' || lang === 'pl' ? pl : en;

export default t;