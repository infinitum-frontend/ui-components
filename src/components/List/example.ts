export const ListBase = [
  {
    text: 'Акции ИФ прямых инвестиций'
  },
  {
    text: 'Акции ИФ смешанных инвестиций'
  },
  {
    text: 'Акции ИФ товарного рынка'
  }
]

export const ListWithStatuses = [
  {
    name: 'ПИФ Открытие — Telecommunicaton Index',
    status: 'error',
    statusText: '8 нарушений',
    additionalInfo: '· 15 показателей к заполнению'
  },
  {
    name: 'ОПИФ И Открытие — ИММВБ — машиностроение',
    status: 'success',
    statusText: 'Проверка завершена: нет нарушений'
  },
  {
    name: 'ЗПИФ КОМБИ Газпромбанк - Перспективный',
    status: 'inProgress',
    statusText: 'Проверяется...'
  },
  {
    name: 'ЗПИФ Н Снежинка — Красная Поляна',
    status: 'inProgress',
    statusText: 'Ждёт данные',
    disabled: true
  }
]

export const ListWithNestedSelection = [
  {
    text: 'Акции',
    selected: false,
    subitems: [
      {
        text: 'Акции ИФ акций',
        selected: false
      },
      {
        text: 'Акции ИФ венчурного',
        selected: true
      },
      {
        text: 'Акции ИФ денежного рынка',
        selected: false
      },
      {
        text: 'Акции ИФ ипотечного',
        selected: false
      }
    ]
  },
  {
    text: 'Облигации',
    selected: false,
    subitems: [
      {
        text: 'Облигации внешних облигационных займов РФ',
        selected: false
      },
      {
        text: 'Облигации государственных компаний',
        selected: false
      },
      {
        text: 'Облигации государственных корпораций',
        selected: false
      },
      {
        text: 'Облигации международных организаций',
        selected: false
      }
    ]
  }
]

export const BaseListLong = [
  {
    text: 'Акции ИФ акций'
  },
  {
    text: 'Акции ИФ венчурного'
  },
  {
    text: 'Акции ИФ денежного рынка'
  },
  {
    text: 'Акции ИФ индексного'
  },
  {
    text: 'Акции ИФ ипотечного'
  },
  {
    text: 'Акции ИФ кредитного'
  },
  {
    text: 'Акции ИФ недвижимости'
  },
  {
    text: 'Акции ИФ облигаций'
  }
]
