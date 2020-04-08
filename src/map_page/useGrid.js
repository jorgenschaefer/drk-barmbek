import React, { useState } from "react";

export default function useGrid () {
  return useState(new Grid())
}

class Grid {
  constructor() {
    this.orientation = 'landscape'
    this.rows = 10
    this.columns = 5
  }

  columnNames() {
    return Array(this.columns).fill(0).map((k, i) => i + 1)
  }

  rowNames() {
    return Array(this.rows).fill(0).map((k, i) => i + 1)
  }

  isLandscape() {
    return this.orientation === 'landscape'
  }

  isPortrait() {
    return this.orientation === 'portrait'
  }

  switchOrientation() {
    const orientation = this.isLandscape() ? 'portrait' : 'landscape'
    return this.build({ orientation })
  }

  increase() {
    return this.build({ rows: this.rows+1, columns: this.columns+1 })
  }

  decrease() {
    return this.build({ rows: this.rows-1, columns: this.columns-1 })
  }

  build(values) {
    return Object.assign(new Grid(), this, values)
  }
}
