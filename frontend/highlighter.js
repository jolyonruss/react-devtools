
class Highlighter {
  constructor(win, onSelect) {
    this.win = win;
    this.onSelect = onSelect;
    this._cb = this.onHover.bind(this);
    this._click = this.onClick.bind(this);
    this._mdown = this.onMouseDown.bind(this);
    this.hover = null;
    this.win.addEventListener('mouseover', this._cb, true);
    this.win.addEventListener('mousedown', this._mdown, true);
    this.win.addEventListener('click', this._click, true);
  }

  startInspecting() {
    this.inspecting = true;
  }

  stopInspecting() {
    this.win.removeEventListener('mouseover', this._cb);
  }

  highlight(node) {
    if (!this.hover) {
      this.hover = this.win.document.createElement('div');
      this.hover.style.backgroundColor = 'rgba(255,0,0,.1)';
      this.hover.style.pointerEvents = 'none';
      this.hover.style.position = 'fixed';
      this.win.document.body.appendChild(this.hover);
    }
    this.inspected = node;
    this.hover.style.top = node.offsetTop + 'px';
    this.hover.style.width = node.offsetWidth + 'px';
    this.hover.style.height = node.offsetHeight + 'px';
    this.hover.style.left = node.offsetLeft + 'px';
  }

  hideHighlight() {
    this.inspecting = false;
    if (!this.hover) {
      return;
    }
    this.hover.parentNode.removeChild(this.hover);
    this.hover = null;
  }

  onMouseDown(evt) {
    if (!this.inspecting) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    evt.cancelBubble = true;
    this.onSelect(evt.target);
    return;
  }

  onClick(evt) {
    if (!this.inspecting) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    evt.cancelBubble = true;
    this.hideHighlight();
  }

  onHover(evt) {
    if (!this.inspecting) {
      return;
    }
    evt.preventDefault();
    evt.stopPropagation();
    evt.cancelBubble = true;
    this.highlight(evt.target);
  }

  inject() {
    var doc = this.win.document;
    var b = doc.createElement('button');
    b.onclick = this.startInspecting.bind(this);
    b.innerHTML = 'Inspect';
    b.style.position = 'fixed';
    b.style.bottom = '10px';
    b.style.right = '10px';
    b.style.fontSize = '30px';
    b.style.zIndex = 10000;
    doc.body.appendChild(b);
  }
}

module.exports = Highlighter;
