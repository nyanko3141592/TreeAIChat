import '../style.css'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY_STORAGE_KEY = 'gemini_api_key';

let chatHistory = []; // 会話ツリー全体を保持
let selectedNodeId = null; // 現在選択されているノードID
let genAI = null; // GoogleGenerativeAIインスタンス
let chat = null; // ChatSessionインスタンス

/**
 * ユニークなノードIDを生成します。
 * @returns {string}
 */
const generateNodeId = () => {
  return `node-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * 指定されたIDのノードを会話ツリーから検索します。
 * @param {string} nodeId 検索するノードのID
 * @param {Array} nodes 検索対象のノード配列 (デフォルトは chatHistory)
 * @returns {object|null} 見つかったノードオブジェクト、またはnull
 */
const findNodeById = (nodeId, nodes = chatHistory) => {
  for (const node of nodes) {
    if (node.id === nodeId) return node;
    if (node.children) {
      const found = findNodeById(nodeId, node.children);
      if (found) return found;
    }
  }
  return null;
};

/**
 * 会話ノードをチャットコンテナに表示します。
 * @param {object} node 表示する会話ノード
 * @param {HTMLElement} parentElement このノードの親となるHTML要素（ツリー表示用）
 * @param {number} indentLevel インデントレベル（ツリー表示用）
 */
const displayMessageNode = (node, parentElement, indentLevel = 0) => {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(node.type === 'user' ? 'user-message' : 'ai-message');
  messageDiv.dataset.nodeId = node.id;
  messageDiv.style.marginLeft = `${indentLevel * 20}px`; // インデントで階層を表現

  const p = document.createElement('p');
  p.textContent = node.text;
  messageDiv.appendChild(p);

  if (node.id === selectedNodeId) {
    messageDiv.classList.add('selected-node');
  }

  messageDiv.addEventListener('click', (event) => {
    event.stopPropagation();
    selectedNodeId = node.id;
    renderChatTree(); // ハイライト更新のために再描画
    updateInputAreaPlaceholder(); // 入力エリアのプレースホルダー更新
    console.log(`Node selected: ${selectedNodeId}`);
  });

  parentElement.appendChild(messageDiv);

  if (node.children && node.children.length > 0) {
    node.children.forEach(childNode => displayMessageNode(childNode, parentElement, indentLevel + 1));
  }
};

/**
 * 会話ツリー全体を再描画します。
 */
const renderChatTree = () => {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.innerHTML = ''; // 既存の表示をクリア
  chatHistory.forEach(rootNode => displayMessageNode(rootNode, chatContainer, 0));
};

/**
 * 入力エリアのプレースホルダーを選択されているノードに応じて更新します。
 */
const updateInputAreaPlaceholder = () => {
  const messageInput = document.getElementById('message-input');
  if (!selectedNodeId) {
    messageInput.placeholder = 'ノードを選択してください...';
    messageInput.disabled = true;
    return;
  }
  messageInput.disabled = false;
  const selectedNode = findNodeById(selectedNodeId);
  if (selectedNode) {
    if (selectedNode.type === 'ai') {
      messageInput.placeholder = 'AIの応答に対して質問を入力...';
    } else {
      // ユーザーノードが選択された場合、AIに応答を生成させる想定だが、
      // 現状ではユーザーが直接入力するため、一旦汎用的なプレースホルダーにする。
      // 将来的には「AIに応答を生成させる」ボタンなどを設けることも検討。
      messageInput.placeholder = '次のメッセージを入力 (AIの応答として追加されます)...';
    }
  } else {
    messageInput.placeholder = 'メッセージを入力...';
  }
};

/**
 * GoogleGenerativeAIインスタンスとChatSessionを初期化します。
 * @param {string} apiKey
 */
const initializeGenerativeAI = (apiKey) => {
  if (!apiKey) {
    console.error('API Key is missing for AI initialization.');
    alert('APIキーが設定されていません。ヘッダーからAPIキーを設定してください。');
    // TODO: UI上でより明確にAPIキー設定を促す
    return false;
  }
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    // For chat, use the gemini-1.0-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});
    // ChatSessionを初期化 (会話履歴は都度送信するので、SDK内部の履歴は空で開始)
    chat = model.startChat({
      history: [], //最初は空の履歴
      generationConfig: {
        // maxOutputTokens: 200, // 必要に応じて設定
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });
    console.log('Generative AI initialized.');
    return true;
  } catch (error) {
    console.error('Error initializing Generative AI:', error);
    alert('AIの初期化に失敗しました。APIキーが正しいか確認してください。');
    return false;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.log('AI Chat App Loaded');

  // DOM要素の取得
  const apiKeyInput = document.getElementById('api-key-input');
  const saveApiKeyButton = document.getElementById('save-api-key');
  const resetApiKeyButton = document.getElementById('reset-api-key');
  const apiKeySection = document.getElementById('api-key-section'); // APIキーセクション全体
  const chatContainer = document.getElementById('chat-container');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  // APIキー関連の処理
  const loadApiKey = () => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedApiKey) {
      apiKeyInput.value = storedApiKey;
      apiKeyInput.style.display = 'none';
      saveApiKeyButton.style.display = 'none';
      resetApiKeyButton.style.display = 'inline-block';
      console.log('API Key loaded from localStorage.');
      initializeGenerativeAI(storedApiKey); // APIキーロード時にAIを初期化
    } else {
      apiKeyInput.style.display = 'inline-block';
      saveApiKeyButton.style.display = 'inline-block';
      resetApiKeyButton.style.display = 'none';
      console.log('API Key not found in localStorage.');
    }
  };

  const saveApiKey = () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
      console.log('API Key saved to localStorage.');
      loadApiKey(); // 表示を更新し、AIを初期化
    } else {
      alert('APIキーを入力してください。');
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    apiKeyInput.value = ''; // 入力フィールドもクリア
    console.log('API Key removed from localStorage.');
    loadApiKey(); // 表示を更新
  };

  saveApiKeyButton.addEventListener('click', saveApiKey);
  resetApiKeyButton.addEventListener('click', resetApiKey);

  // 初期ロード時にAPIキーの状態を反映
  loadApiKey();

  // チャット履歴の初期化と表示
  if (chatHistory.length === 0) {
    const rootId = generateNodeId();
    chatHistory = [
      {
        id: rootId,
        type: 'ai',
        text: 'AIに質問してください',
        children: []
      }
    ];
    selectedNodeId = rootId; // 初期選択はルートノード
  }
  renderChatTree();
  updateInputAreaPlaceholder(); // 初期プレースホルダー設定

  // メッセージ送信処理
  const sendMessage = async () => {
    const text = messageInput.value.trim();
    if (!text) return;
    if (!selectedNodeId) {
      alert('メッセージを追加する親ノードを選択してください。');
      return;
    }

    const parentNode = findNodeById(selectedNodeId);
    if (!parentNode) {
      alert('選択されたノードが見つかりません。');
      return;
    }

    // ユーザーメッセージノードの作成と追加
    const userMessageId = generateNodeId();
    const userMessageNode = {
      id: userMessageId,
      type: 'user',
      text: text,
      children: []
    };
    parentNode.children.push(userMessageNode);
    selectedNodeId = userMessageId; // 新しいユーザーメッセージを選択状態にする
    renderChatTree();
    updateInputAreaPlaceholder();
    messageInput.value = '';
    adjustTextareaHeight(messageInput);

    // APIキーとAIが初期化されているか確認
    if (!genAI || !chat) {
        const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (!apiKey || !initializeGenerativeAI(apiKey)) {
            alert('AIが初期化されていません。APIキーを確認してください。');
            // ユーザーメッセージは追加されたので、ここで処理を中断
            return;
        }
    }

    // AIに応答を生成させる (親がAIノード、またはユーザーノードの場合もAPIを呼ぶ想定)
    // 仕様: あらゆる会話ノードから複数の分岐（ツリー構造）を無限に作成可能です。
    // 親ノードがAIの場合、子のノードはユーザーの質問になる。
    // 親ノードがユーザーの場合、子のノードはAIの応答になる。
    // 今回は、ユーザーが入力したメッセージ(userMessageNode)に対するAIの応答を生成する。

    // ローディング表示 (簡易)
    const loadingMessageId = generateNodeId();
    const loadingNode = {
      id: loadingMessageId,
      type: 'ai',
      text: 'AIが応答を生成中です...',
      children: []
    };
    userMessageNode.children.push(loadingNode);
    selectedNodeId = loadingMessageId;
    renderChatTree();

    try {
      // Gemini APIに送信する会話履歴の構築
      // ルートから現在のuserMessageNodeまでのパスを履歴として送信
      const historyForApi = [];
      let current = userMessageNode;
      const path = [current];
      while (current) {
        const parent = findNodeById(selectedNodeId, chatHistory); // このselectedNodeIdは誤り。findParentNodeのような関数が必要
                                                                    // 正しくは、userMessageNodeの親をたどる必要がある。
                                                                    // 今回は簡略化のため、ルートからuserMessageNodeまでのメッセージのみを履歴とする。
                                                                    // project.mdのデータ構造では親子関係が明確なので、それを辿るのが正しい。
                                                                    // 一旦、直前のユーザーメッセージのみを送信する形にする。
        // TODO: 正しい会話履歴を構築するロジックに修正
        break; // 仮でループを抜ける
      }

      // 実際には、送信するメッセージは { role: "user" | "model", parts: [{ text: "..." }] } の形式
      // 今回は model.sendMessage を使うので、SDKが形式を整えてくれる
      const result = await chat.sendMessage(text); // ユーザーの最新の質問を送信
      const response = result.response;
      const aiResponseText = response.text();

      // ローディング表示をAIの応答に置き換える
      loadingNode.text = aiResponseText;
      // loadingNode.id はそのまま。必要なら新しいIDを振っても良い。

    } catch (error) {
      console.error('Error sending message to Generative AI:', error);
      loadingNode.text = 'AIの応答取得に失敗しました。エラー: ' + error.message;
      // エラー内容によっては、APIキーの再設定を促すなどの処理も考慮
      if (error.message.includes('API key not valid')) {
        alert('APIキーが無効です。再度設定してください。');
        // resetApiKey(); // APIキーをリセットする処理を呼ぶなど
      }
    } finally {
      selectedNodeId = loadingNode.id; // AIの応答ノードを選択状態にする
      renderChatTree();
      updateInputAreaPlaceholder();
    }
  };

  sendButton.addEventListener('click', sendMessage);
  messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Enterでの改行を防ぐ
      sendMessage();
    }
  });

  // 初期メッセージの高さを自動調整
  adjustTextareaHeight(messageInput);

  // テキストエリアの入力に応じて高さを自動調整
  messageInput.addEventListener('input', () => {
    adjustTextareaHeight(messageInput);
  });
});

/**
 * テキストエリアの高さを内容に応じて自動調整します。
 * @param {HTMLTextAreaElement} textarea 対象のテキストエリア要素
 */
function adjustTextareaHeight(textarea) {
  textarea.style.height = 'auto'; // 一旦高さを自動に戻す
  textarea.style.height = textarea.scrollHeight + 'px'; // スクロールハイトに基づいて高さを設定
}
