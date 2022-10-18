import { h, VNode } from 'vue';

interface TablePropsInterface {
  header: string[];
  data: any[];
}

const Table = (props: TablePropsInterface) => {
  
  if (!props.header) {
    throw new Error('Please pass in your header strings. Prop: header');
  }

  if (!props.data) {
    throw new Error('Please pass in some data for the table. Prop: data');
  }

  const tHeader: VNode = h('tr', { class: ['bg-slate-200'] }, props.header.map(header => h('td', header)));

  if (!tHeader) {
    throw new Error('Could not create the table header. Please debug');
  }

  const tRows: VNode[] = [];
  if (props.data) {
    props.data.forEach(each => {
      const cells = [];
      for (const el of Object.values(each)) {
        cells.push(h('td', { class: ['px-5 border-b border-slate-200'] }, el as string));
      }
      tRows.push(h('tr', cells));
    });
  }

  return h('table', [tHeader, ...tRows]);
};

Table.props = ['data', 'header'];

export default Table;