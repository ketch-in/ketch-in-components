import PureComponent, { PureComponentProps } from "@/core/PureComponent";
import ColorPaletteController from "@/layers/color-palette";
import ShapeListController from "@/layers/shape-list";
import { Shape } from "@/layers/shape-list/ShapeList";

export interface ToolbarComponentProps extends PureComponentProps {
  status: string; // TODO: status type 설정
  handlePen: () => void;
  handleShape: (selectedShape: Shape) => void;
  handleColor: (selectedColor: string) => void;
  onClear: () => void;
}

export default class ToolbarComponent extends PureComponent {
  private status: string;
  private handlePen: () => void;
  private handleShape: (selectedShape: Shape) => void;
  private handleColor: (selectedColor: string) => void;
  private onClear: () => void;

  constructor({
    data = {},
    status = '',
    handlePen = () => {},
    handleShape = () => {},
    handleColor = () => {},
    onClear = () => {},
  }: ToolbarComponentProps) {
    super({data, defaultClassName: 'toolbar'})
    this.status = status;
    this.handlePen = handlePen;
    this.handleShape = handleShape;
    this.handleColor = handleColor;
    this.onClear = onClear;
  }

  mount(target: HTMLElement) {
    const targetEl = this.getElement();
    const status = this.createElement('span');
    const pen = this.createElement('button');
    const shape = this.createElement('span');
    const palette = this.createElement('span');
    const clear = this.createElement('button');

    const shapeListController = new ShapeListController(shape, {});
    const colorPaletteController = new ColorPaletteController(palette, {});

    /* TODO:
    - status socket에서 받은 값 연결
    - pen, clear, shape: 아이콘 적용
    - shape, palette: custom component로 변경
    */

    status.innerText = `[${this.status}]`;
    status.classList.add('status');

    pen.classList.add('btn_pen');
    pen.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220.001 220.001">
        <path d="M132.018,34.787l53.197,53.197L69.568,203.631L16.37,150.434L132.018,34.787z M212.696,60.502   c9.738-9.738,9.742-25.527,0-35.268l-17.93-17.93c-9.738-9.74-25.529-9.738-35.268,0l-17.346,17.347l53.199,53.196L212.696,60.502z   "/>
        <polygon points="0,220 59.34,213.86 6.143,160.661  "/>
      </svg>`;

    shape.classList.add('select_shape');
    shape.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path fill="none" d="M0 0h24v24H0z"/>
        <path d="M5 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm14 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm0 14a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM5 22a3 3 0 1 1 0-6 3 3 0 0 1 0 6zM9 4h6v2H9V4zm0 14h6v2H9v-2zM4 9h2v6H4V9zm14 0h2v6h-2V9z"/>
      </svg>`;

    palette.classList.add('palette');
    palette.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <rect width="24" height="24" opacity="0"/>
        <path d="M19.54 5.08A10.61 10.61 0 0 0 11.91 2a10 10 0 0 0-.05 20 2.58 2.58 0 0 0 2.53-1.89 2.52 2.52 0 0 0-.57-2.28.5.5 0 0 1 .37-.83h1.65A6.15 6.15 0 0 0 22 11.33a8.48 8.48 0 0 0-2.46-6.25zM15.88 15h-1.65a2.49 2.49 0 0 0-1.87 4.15.49.49 0 0 1 .12.49c-.05.21-.28.34-.59.36a8 8 0 0 1-7.82-9.11A8.1 8.1 0 0 1 11.92 4H12a8.47 8.47 0 0 1 6.1 2.48 6.5 6.5 0 0 1 1.9 4.77A4.17 4.17 0 0 1 15.88 15z"/>
        <circle cx="12" cy="6.5" r="1.5"/>
        <path d="M15.25 7.2a1.5 1.5 0 1 0 2.05.55 1.5 1.5 0 0 0-2.05-.55z"/>
        <path d="M8.75 7.2a1.5 1.5 0 1 0 .55 2.05 1.5 1.5 0 0 0-.55-2.05z"/>
        <path d="M6.16 11.26a1.5 1.5 0 1 0 2.08.4 1.49 1.49 0 0 0-2.08-.4z"/>
      </svg>`;

    clear.classList.add('btn_clear')
    clear.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
        <path xmlns="http://www.w3.org/2000/svg" d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
      </svg>`;

    targetEl.appendChild(status);
    targetEl.appendChild(pen);
    targetEl.appendChild(shape);
    targetEl.appendChild(palette);
    targetEl.appendChild(clear);

    // TODO 드래그드롭 피처 추가 작성 필요
    // status.onmousedown
    // status.onmousemove
    // status.onmouseup

    pen.onclick = this.handlePen;

    shape.onclick = (event) => {
      event.stopPropagation()
      if (shape.children.length === 1) {
        shapeListController.open({
          onShapeSelect: (selectedShape: Shape) => this.handleShape(selectedShape),
        });
      } else {
        shapeListController.close();
      }
    }

    palette.onclick = (event) => {
      event.stopPropagation()
      if (palette.children.length === 1) {
        colorPaletteController.open({
          onColorSelect: (selectedColor: string) => this.handleColor(selectedColor),
        });
      } else {
        colorPaletteController.close();
      }
    };
    clear.onclick = this.onClear;

    return super.mount(target);
  }
}
