import { ElMessage, ElMessageBox, ElNotification, type MessageParams, type MessageOptions } from "element-plus";

// 定义消息类型
type MessageType = "success" | "warning" | "info" | "error";

// 用于防抖的消息缓存
const messageCache = new Map<string, number>();

// 封装 ElMessage
export const useMessage = () => {
  // 带防抖功能的消息方法
  const debounceMessage = (options: MessageParams | string, debounceTime = 3000) => {
    const key = typeof options === 'string' ? options : JSON.stringify(options);
    const now = Date.now();
    
    // 检查是否在防抖时间内
    if (messageCache.has(key) && now - messageCache.get(key)! < debounceTime) {
      return null; // 在防抖时间内，不显示重复消息
    }
    
    // 更新缓存时间
    messageCache.set(key, now);
    
    // 显示消息
    return ElMessage(options);
  };
  
  const message = (options: MessageParams | string) => ElMessage(options);

  // 快捷方法（success/error/warning/info）
  const createMessageMethods = (type: MessageType) => {
    return (text: string, config?: MessageOptions & { debounce?: boolean, debounceTime?: number }) => {
      const { debounce, debounceTime, ...restConfig } = config || {};
      
      // 如果启用防抖
      if (debounce) {
        return debounceMessage({
          type,
          message: text,
          ...restConfig,
        }, debounceTime);
      }
      
      return ElMessage({
        type,
        message: text,
        ...restConfig,
      });
    };
  };

  return {
    message, // 通用方法
    debounceMessage, // 带防抖的消息方法
    success: createMessageMethods("success"),
    error: createMessageMethods("error"),
    warning: createMessageMethods("warning"),
    info: createMessageMethods("info"),
    // 可选：封装 ElMessageBox 和 ElNotification
    confirm: ElMessageBox.confirm,
    notify: ElNotification,
  };
};

// 导出单例（直接调用）
export const message = useMessage();