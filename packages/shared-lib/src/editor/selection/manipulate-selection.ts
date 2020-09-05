//region Preamble
/**
 * https://github.com/guesant/ui5-monorepo
 * Copyright (C) 2020 Gabriel Rodrigues
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
//endregion

import { range } from "../../range";
import { minmax } from "../../minmax";

export type SupportedActions = "toggle" | "range" | "select" | "clear";

export const clearSelection = () => () => [];

export const toggleSelection = (selectedItems: number[]) => (idx: number) =>
  selectedItems.includes(idx)
    ? [...selectedItems.filter((i) => i !== idx)]
    : [...selectedItems, idx];

const asc = (a: number, b: number) => a - b;
const desc = (a: number, b: number) => b - a;

export const rangeSelection = (selectedItems: number[]) => (idx: number) => [
  ...selectedItems,
  ...[
    ...(selectedItems.length
      ? range(
          ...minmax({ withMax: (n) => n + 1 })(idx, selectedItems.slice(-1)[0]),
        )
          .filter((i) => !selectedItems.includes(i))
          .sort(idx < selectedItems.slice(-1)[0] ? desc : asc)
      : []),
  ],
];

export const manipulateSelection = (mode: SupportedActions) => (
  selectedItems: number[],
) => (idx: number) => {
  switch (mode) {
    case "toggle":
      return toggleSelection(selectedItems)(idx);
    case "range":
      return rangeSelection(selectedItems)(idx);
    case "clear":
      return clearSelection()();
    case "select":
      return [idx];
  }
};