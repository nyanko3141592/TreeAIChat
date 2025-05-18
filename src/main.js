import '../style.css'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const API_KEY_STORAGE_KEY = 'gemini_api_key';
const SELECTED_MODEL_STORAGE_KEY = 'gemini_selected_model';

const DEFAULT_MODEL = 'gemini-1.5-flash-latest'; // デフォルトモデル
const AVAILABLE_MODELS = [
  { name: 'Gemini 1.5 Flash (Latest)', value: 'gemini-1.5-flash-latest' },
  { name: 'Gemini 1.5 Pro (Latest)', value: 'gemini-1.5-pro-latest' },
  { name: 'Gemini 2.0 Flash', value: 'gemini-2.0-flash' },
  { name: 'Gemini 2.5 Flash (Preview 04-17)', value: 'gemini-2.5-flash-preview-04-17' },
  { name: 'Gemini 2.5 Pro (Preview 05-06)', value: 'gemini-2.5-pro-preview-05-06' },
  { name: 'Gemini 1.0 Pro', value: 'gemini-1.0-pro' },
];

let chatHistory = [];
let selectedNodeId = null;
let genAI = null; // GoogleGenerativeAIインスタンスを保持
let model = null; // GenerativeModelインスタンスを保持 (ChatSessionの代わりに)

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
 * @param {HTMLElement} parentDomElement このノードの親となるHTML要素（ツリー表示用）
 * @param {number} indentLevel インデントレベル（ツリー表示用）
 */
const displayMessageNode = (node, parentDomElement, indentLevel = 0) => {
  // ノード全体をラップするdiv (message-node-wrapper)
  const nodeWrapper = document.createElement('div');
  nodeWrapper.classList.add('message-node-wrapper');
  // インデントはラッパーに適用（レイアウトに応じて調整が必要）
  // nodeWrapper.style.marginLeft = `${indentLevel * 20}px`; 

  // メッセージ本体を表示するdiv (message-content)
  const messageContentDiv = document.createElement('div');
  messageContentDiv.classList.add('message');
  messageContentDiv.classList.add(node.type === 'user' ? 'user-message' : 'ai-message');
  messageContentDiv.dataset.nodeId = node.id;
  messageContentDiv.id = `msg-${node.id}`; // DOM id を設定
  // is-child, has-children クラスは messageContentDiv につけるか nodeWrapper につけるか検討
  if (indentLevel > 0) messageContentDiv.classList.add('is-child');
  if (node.children && node.children.length > 0) messageContentDiv.classList.add('has-children');

  const p = document.createElement('p');
  p.textContent = node.text;
  messageContentDiv.appendChild(p);

  if (node.id === selectedNodeId) {
    messageContentDiv.classList.add('selected-node');
  }

  messageContentDiv.addEventListener('click', (event) => {
    event.stopPropagation();
    selectedNodeId = node.id;
    renderChatTree();
    updateInputAreaPlaceholder();
    console.log(`Node selected: ${selectedNodeId}`);
  });

  nodeWrapper.appendChild(messageContentDiv);

  // 子ノード群のためのコンテナ (children-container)
  if (node.children && node.children.length > 0) {
    const childrenContainer = document.createElement('div');
    childrenContainer.classList.add('children-container');
    // childrenContainer.style.marginLeft = `${(indentLevel + 1) * 20}px`; // 子コンテナのインデント例

    node.children.forEach((childNode) => {
      displayMessageNode(childNode, childrenContainer, indentLevel + 1);
    });
    nodeWrapper.appendChild(childrenContainer);
  }

  parentDomElement.appendChild(nodeWrapper);
};

/**
 * 会話ツリー全体を再描画します。
 */
const renderChatTree = () => {
  const chatContainer = document.getElementById('chat-container');
  chatContainer.innerHTML = ''; // 既存の表示をクリア

  // SVGコンテナを準備 (存在しなければ作成)
  let svgContainer = document.getElementById('connection-lines-svg');
  if (!svgContainer) {
    svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svgContainer.id = 'connection-lines-svg';
    // chatContainer.appendChild(svgContainer); // chatContainerの子として追加
    // SVGを最前面、しかしインタラクションを阻害しないようにする。main#chat-container の子として追加。
    // chatContainer の最初の子要素として追加することで、z-indexの問題を回避しやすくする。
    chatContainer.insertBefore(svgContainer, chatContainer.firstChild);
  }
  svgContainer.innerHTML = ''; // 既存の線をクリア

  // DOMにノードを追加
  chatHistory.forEach(rootNode => {
    displayMessageNode(rootNode, chatContainer, 0);
  });

  // 接続線を描画 (DOMが構築された後)
  // setTimeout を使って、DOMのレンダリングが完了するのを少し待つ (確実性の向上)
  setTimeout(drawConnections, 0);
};

/**
 * 会話ノード間の接続線を描画します。
 */
const drawConnections = () => {
  const svgContainer = document.getElementById('connection-lines-svg');
  if (!svgContainer) return;

  // chatContainer のスクロール状態やサイズを考慮してSVGの viewBox や大きさを設定
  const chatRect = document.getElementById('chat-container').getBoundingClientRect();
  const scrollWidth = document.getElementById('chat-container').scrollWidth;
  const scrollHeight = document.getElementById('chat-container').scrollHeight;
  svgContainer.setAttribute('viewBox', `0 0 ${scrollWidth} ${scrollHeight}`);
  svgContainer.style.width = `${scrollWidth}px`;
  svgContainer.style.height = `${scrollHeight}px`;

  const drawLine = (x1, y1, x2, y2) => {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#555');
    line.setAttribute('stroke-width', '2');
    svgContainer.appendChild(line);
  };

  // chatHistory を再帰的に走査して線を描画
  const traverseAndDraw = (nodes, parentNodeElement = null) => {
    nodes.forEach(node => {
      const nodeElement = document.getElementById(`msg-${node.id}`);
      if (!nodeElement) return;

      const nodeRect = nodeElement.getBoundingClientRect();
      // chatContainer基準の相対座標に変換
      const nodeCenterX = nodeElement.offsetLeft + nodeRect.width / 2;
      const nodeTopY = nodeElement.offsetTop;
      const nodeBottomY = nodeElement.offsetTop + nodeRect.height;

      if (parentNodeElement) {
        const parentRect = parentNodeElement.getBoundingClientRect();
        const parentCenterX = parentNodeElement.offsetLeft + parentRect.width / 2;
        const parentBottomY = parentNodeElement.offsetTop + parentRect.height;
        
        // 親ノードの下中央から子ノードの上中央へ線を引く
        drawLine(parentCenterX, parentBottomY, nodeCenterX, nodeTopY);
      }

      if (node.children && node.children.length > 0) {
        // 子コンテナではなく、個々の子メッセージ要素に対して線を引くため、
        // 再帰呼び出しの際に親として現在の nodeElement を渡す
        traverseAndDraw(node.children, nodeElement);
      }
    });
  };

  traverseAndDraw(chatHistory);
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
 * GoogleGenerativeAIインスタンスとGenerativeModelを初期化します。
 * @param {string} apiKey
 * @param {string} modelName 使用するモデル名
 */
const initializeGenerativeAI = (apiKey, modelName) => {
  if (!apiKey) {
    console.error('API Key is missing for AI initialization.');
    return false;
  }
  if (!modelName) {
    console.error('Model name is missing for AI initialization.');
    alert('使用するモデルが指定されていません。');
    return false;
  }
  try {
    genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({ model: modelName }); // ChatSessionではなくmodelを直接取得
    console.log(`Generative AI initialized with model: ${modelName}. Model instance ready.`);
    return true;
  } catch (error) {
    console.error('Error initializing Generative AI:', error);
    alert(`AIの初期化に失敗しました。APIキーまたはモデル名(${modelName})が正しいか確認してください。エラー: ${error.message}`);
    genAI = null;
    model = null; // modelもnullに
    return false;
  }
};

/**
 * 指定されたノードIDまでのパスをルートから取得します。
 * @param {string} targetNodeId ターゲットノードのID
 * @param {Array} nodes 現在検索中のノード配列 (デフォルトは chatHistory)
 * @param {Array} currentPath 現在のパス (再帰用)
 * @returns {Array|null} ノードオブジェクトの配列としてのパス、見つからなければnull
 */
const getPathToNode = (targetNodeId, nodes = chatHistory, currentPath = []) => {
  for (const n of nodes) {
    const path = [...currentPath, n];
    if (n.id === targetNodeId) {
      return path;
    }
    if (n.children && n.children.length > 0) {
      const foundPath = getPathToNode(targetNodeId, n.children, path);
      if (foundPath) {
        return foundPath;
      }
    }
  }
  return null;
};

/**
 * ノードのパスをAPIが期待する履歴形式に変換します。
 * @param {Array} path ノードオブジェクトの配列 (ルートからのパス)
 * @returns {Array} APIのcontents形式の配列
 */
const formatHistoryForApi = (path) => {
  if (!path) return [];
  return path.map(node => ({
    role: node.type === 'ai' ? 'model' : 'user',
    parts: [{ text: node.text }],
  }));
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
  const modelSelectElement = document.getElementById('model-select');

  const populateModelSelect = () => {
    AVAILABLE_MODELS.forEach(model => {
      const option = document.createElement('option');
      option.value = model.value;
      option.textContent = model.name;
      modelSelectElement.appendChild(option);
    });
  };

  const loadAndApplySelectedModel = () => {
    const savedModel = localStorage.getItem(SELECTED_MODEL_STORAGE_KEY);
    const modelToUse = AVAILABLE_MODELS.some(m => m.value === savedModel) ? savedModel : DEFAULT_MODEL;
    modelSelectElement.value = modelToUse;
    return modelToUse;
  };

  const handleModelChange = () => {
    const selectedModel = modelSelectElement.value;
    localStorage.setItem(SELECTED_MODEL_STORAGE_KEY, selectedModel);
    console.log(`Model changed to: ${selectedModel}`);
    // APIキーが既に設定されていれば、AIを再初期化
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    if (storedApiKey && genAI) { // genAIの存在も確認（saveApiKey直後など未初期化の場合があるため）
      if (!initializeGenerativeAI(storedApiKey, selectedModel)) {
         // 初期化失敗時のアラートはinitializeGenerativeAI内で表示される
         // 必要であれば、ここでさらにUI制御（例：入力不可にするなど）を行う
      }
    }
  };

  // モデル選択ドロップダウンの初期化とイベントリスナー設定
  populateModelSelect();
  const currentModel = loadAndApplySelectedModel(); // 初期モデルを決定
  modelSelectElement.addEventListener('change', handleModelChange);

  // APIキー関連の処理
  const loadApiKey = () => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
    const currentSelectedModel = modelSelectElement.value;
    if (storedApiKey) {
      apiKeyInput.value = storedApiKey;
      apiKeyInput.style.display = 'none';
      saveApiKeyButton.style.display = 'none';
      resetApiKeyButton.style.display = 'inline-block';
      console.log('API Key loaded from localStorage.');
      if (!initializeGenerativeAI(storedApiKey, currentSelectedModel)) {
        alert('APIキーまたはモデル設定に問題があるため、AI機能が利用できません。');
      }
    } else {
      apiKeyInput.style.display = 'inline-block';
      saveApiKeyButton.style.display = 'inline-block';
      resetApiKeyButton.style.display = 'none';
      console.log('API Key not found in localStorage.');
      genAI = null;
      model = null; // model もクリア
    }
  };

  const saveApiKey = () => {
    const apiKey = apiKeyInput.value.trim();
    if (apiKey) {
      localStorage.setItem(API_KEY_STORAGE_KEY, apiKey);
      console.log('API Key saved to localStorage.');
      loadApiKey();
    } else {
      alert('APIキーを入力してください。');
    }
  };

  const resetApiKey = () => {
    localStorage.removeItem(API_KEY_STORAGE_KEY);
    apiKeyInput.value = '';
    genAI = null;
    model = null; // model もクリア
    console.log('API Key removed from localStorage.');
    loadApiKey();
  };

  saveApiKeyButton.addEventListener('click', saveApiKey);
  resetApiKeyButton.addEventListener('click', resetApiKey);

  loadApiKey(); // 初期ロード

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

    // APIキーとAIモデルが初期化されているか確認
    if (!genAI || !model) {
      const apiKey = localStorage.getItem(API_KEY_STORAGE_KEY);
      const currentSelectedModel = modelSelectElement.value; // modelSelectElement がスコープ内にあること
      if (!apiKey || !initializeGenerativeAI(apiKey, currentSelectedModel)) {
        alert('AIが初期化されていません。APIキーとモデル設定を確認してください。');
        return;
      }
      // initializeGenerativeAI が失敗した場合も model は null のままなので、再度チェック
      if (!model) {
        alert('AIモデルの準備に失敗しました。');
        return;
      }
    }

    // 1. ユーザーメッセージノードの作成とツリーへの追加
    const userMessageId = generateNodeId();
    const userMessageNode = {
      id: userMessageId,
      type: 'user',
      text: text,
      children: []
    };
    parentNode.children.push(userMessageNode);
    // 新しいユーザーメッセージを一時的に選択状態にする (UIフィードバックのため)
    // selectedNodeId = userMessageId; // AI応答後にAIノードを選択するため、ここでは更新しないか、一時的とする
    renderChatTree(); // ユーザーメッセージをまず表示
    messageInput.value = '';
    adjustTextareaHeight(messageInput);

    // 2. ローディング表示の準備と表示
    const loadingMessageId = generateNodeId();
    const loadingNode = {
      id: loadingMessageId,
      type: 'ai',
      text: 'AIが応答を生成中です...',
      children: []
    };
    userMessageNode.children.push(loadingNode);
    selectedNodeId = loadingMessageId; // ローディングノードを選択状態に
    renderChatTree(); // ローディング表示
    updateInputAreaPlaceholder();

    try {
      // 3. APIに送信する会話履歴の構築
      //    ユーザーが入力した最新のメッセージ(userMessageNode)を含むパスを取得
      const pathToUserMessage = getPathToNode(userMessageId);
      if (!pathToUserMessage) {
        throw new Error('Failed to build conversation path for API.');
      }
      const historyForApi = formatHistoryForApi(pathToUserMessage);
      
      console.log('Sending to API with history:', JSON.stringify(historyForApi, null, 2));

      // 4. API呼び出し (generateContent を使用)
      const result = await model.generateContent({ contents: historyForApi });
      const response = result.response;
      const aiResponseText = response.text();

      // 5. ローディング表示をAIの応答に置き換える
      loadingNode.text = aiResponseText;

    } catch (error) {
      console.error('Error during AI response generation:', error);
      loadingNode.text = 'AIの応答取得に失敗しました。エラー: ' + error.message;
      if (error.message && error.message.includes('API key not valid')) {
        alert('APIキーが無効です。再度設定してください。');
      }
    } finally {
      // AI応答後(成功・失敗問わず)、AIノード(旧ローディングノード)を選択状態にする
      selectedNodeId = loadingNode.id;
      renderChatTree(); // 最終的な表示更新
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
