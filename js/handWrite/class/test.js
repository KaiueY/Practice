export class update {
  constructor() {
    this.name = 'update';
  
    this.description = '更新数据';
  
    this.options = [
      {
        name: '--id',
        description: '数据ID',
        required: true,
      },
      {
        name: '--data',
        description: '更新的数据',
        required: true,
      },
    ];
  }
}