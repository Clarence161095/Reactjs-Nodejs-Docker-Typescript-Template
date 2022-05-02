const HomeAPI = {
  getListSets: async (params: any) => {
    // const url = `/sets?_embed=cards`;
    // return await AxiosClient.get(url, { ...params });
    // TODO
    return sets;
  },
};

export default HomeAPI;

const sets: any = [
  {
    id: 1,
    userId: 1,
    name: 'Từ vựng chuyên ngành',
    description: 'Từ vựng chuyên ngành khi đọc tài liệu tiếng nhật',
    cards: [
      {
        id: 1,
        userId: 1,
        setId: 1,
        term: '確認',
        define: [
          {
            name: 'define',
            content: 'Xác nhận',
          },
          {
            name: 'hiragana',
            content: 'かくにん'
          },
          {
            name: 'kanji',
            content: 'XÁC NHẬN'
          }
        ],
        sample: [
          {
            content: 'sample 1',
            description: 'Ví dụ 1',
          },
          {
            content: 'sample 2',
            description: 'Ví dụ 2',
          },
        ],
        process: 1,
      },
      {
        id: 2,
        userId: 1,
        setId: 1,
        term: '公式',
        vietnamese: ['Chính thức', 'Công thức'],
        english: ['official'],
        hiragana: 'かくにん',
        kanji: 'CÔNG THỨC',
        sample: [
          {
            content: 'sample 1',
            description: 'Ví dụ 1',
          },
          {
            content: 'sample 2',
            description: 'Ví dụ 2',
          },
        ],
        process: 8,
      },
      {
        id: 3,
        userId: 1,
        setId: 1,
        folderId: 2,
        term: '公式',
        vietnamese: ['Chính thức', 'Công thức'],
        english: ['official'],
        hiragana: 'かくにん',
        kanji: 'CÔNG THỨC',
        sample: [
          {
            content: 'sample 1',
            description: 'Ví dụ 1',
          },
          {
            content: 'sample 2',
            description: 'Ví dụ 2',
          },
        ],
        process: 13,
      },
      {
        id: 4,
        userId: 1,
        setId: 1,
        folderId: 2,
        term: '公式',
        vietnamese: ['Chính thức', 'Công thức'],
        english: ['official'],
        hiragana: 'かくにん',
        kanji: 'CÔNG THỨC',
        sample: [
          {
            content: 'sample 1',
            description: 'Ví dụ 1',
          },
          {
            content: 'sample 2',
            description: 'Ví dụ 2',
          },
        ],
        process: 21,
      },
      {
        id: 5,
        userId: 1,
        setId: 1,
        folderId: 2,
        term: '公式',
        vietnamese: ['Chính thức', 'Công thức'],
        english: ['official'],
        hiragana: 'かくにん',
        kanji: 'CÔNG THỨC',
        sample: [
          {
            content: 'sample 1',
            description: 'Ví dụ 1',
          },
          {
            content: 'sample 2',
            description: 'Ví dụ 2',
          },
        ],
        process: 20,
      },
    ],
  },
];
