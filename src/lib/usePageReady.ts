import { useEffect } from "react";

/**
 * 通知 GlobalTransition：「頁面已經載入完成，可以進行 slide-out」
 * @param condition - 預設為 true，若傳入 boolean 值，會在該條件為 true 時才 dispatch 事件
 */
export function usePageReady(condition: boolean = true) {
  useEffect(() => {
    if (condition) {
      window.dispatchEvent(new Event("pageReady"));
    }
  }, [condition]);
}
