/**
 * @typedef {object} LinkToolData
 * @description Link Tool's input and output data format
 * @property {string} link — data url
 * @property {metaData} meta — fetched link data
 */

/**
 * @typedef {object} metaData
 * @description Fetched link meta data
 * @property {string} image - link's meta image
 * @property {string} title - link's meta title
 * @property {string} description - link's description
 */

// eslint-disable-next-line
import ajax from 'axios'

export default class PageLink {
  
  /**
   * Notify core that read-only mode supported
   *
   * @returns {boolean}
   */
  static get isReadOnlySupported() {
    return true;
  }

  /**
   * Get Tool toolbox settings
   * icon - Tool icon's SVG
   * title - title to show in toolbox
   *
   * @returns {{icon: string, title: string}}
   */
  static get toolbox() {
    return {
        icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
        title: 'PageLink',
    };
  }

  /**
   * Allow to press Enter inside the LinkTool input
   *
   * @returns {boolean}
   * @public
   */
  static get enableLineBreaks() {
    return true;
  }

  /**
   * @param {LinkToolData} data - previously saved data
   * @param {config} config - user config for Tool
   * @param {object} api - Editor.js API
   * @param {object} block - block API
   */
  constructor({ data, config, api, block }) {
    this.api = api;
    this.readOnly = true;
    this.blockAPI = block;

    /**
     * Tool's initial config
     */
    this.config = {
      headers: config.headers || {},
    };

    this.nodes = {
      wrapper: null,
      container: null,
      progress: null,
      linkPage: null,
      linkIcon: null,
      linkTitle: null,
    };

    this._data = {
      link: '',
      meta: {},
    };

    this.data = data;
  }

  /**
   * Renders Block content
   *
   * @public
   *
   * @returns {HTMLDivElement}
   */
  render() {
    this.nodes.wrapper = this.make('div', this.CSS.baseClass);
    this.nodes.container = this.make('div', this.CSS.container);
    this.nodes.linkPage = this.preparePage()

    if (Object.keys(this.data.link).length) {
      this.startFetchLinkData();
    } else {
      this.addPage()
    }
    this.nodes.wrapper.appendChild(this.nodes.container);

    return this.nodes.wrapper;
  }

  async addPage(){
    const baseUrl = process.env.REACT_APP_BASEURL;
    
    try{
      const res = await ajax({
        method: "post",
        url: `${baseUrl}/pages`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ localStorage.getItem("zettel_user_token") || null }`,
        },
      })
      const data = await JSON.stringify(res.data)
      const jsonData = await JSON.parse(data);
      this.onAddPage(jsonData)
    } catch(error){
      console.error(error)
    }
  }

  onAddPage(inputdata){
    const domainUrl = process.env.REACT_APP_DOMAINURL;
    const url = `${domainUrl}/app/${inputdata.id}`
    this.data = {
      link: url,
      meta: inputdata,
    };
    
    this.showPage({
      icon: inputdata.icon,
      title: inputdata.title,
      url
    })
    this.blockAPI.dispatchChange()
  }

  preparePage(){
    const holder = this.make('a', this.CSS.linkPage, {
        target: '_blank',
        rel: 'nofollow noindex noreferrer',
    });

    this.nodes.linkTitle = this.make('div', this.CSS.linkTitle);
    this.nodes.linkIcon = this.make('span', this.CSS.linkText);

    return holder;
  }
  startFetchLinkData(){
    this.fetchLinkData()
  }

  /**
   * Sends to backend pasted url and receives link data
   *
   * @param {string} url - link source url
   */
  async fetchLinkData() {
    const baseUrl = process.env.REACT_APP_BASEURL;
    const url = `${baseUrl}/pages/${this.data.meta.id}/show_page_info.json`
    try {
      const {data} = await ajax({
        method: "get",
        url: url,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ localStorage.getItem("zettel_user_token") || null }`,
        }
      });
      this.onFetchDone(data)
    } catch (error) {
      console.error(error)
      this.fetchingFailed()
    }
  }

  /**
   * Link data fetching callback
   *
   * @param {UploadResponseFormat} response
   */
  onFetchDone({id, title, icon}) {
    if (id){
      this.showPage({url: this.data.link, title: title, icon: icon});
    }
  }

  showPage({ title, url, icon }){
    this.nodes.container.appendChild(this.nodes.linkPage);
    
    // if (icon){
    this.nodes.linkIcon.textContent = icon || "🗒️"
    this.nodes.linkPage.appendChild(this.nodes.linkIcon);
    // }

    if (title) {
      this.nodes.linkTitle.textContent = title;
      this.nodes.linkPage.appendChild(this.nodes.linkTitle);
    }

    this.nodes.linkPage.classList.add(this.CSS.linkContentRendered);
    this.nodes.linkPage.setAttribute('href', url);
    this.nodes.linkPage.setAttribute('target', "_self");

  }
  /**
   * Return Block data
   *
   * @public
   *
   * @returns {LinkToolData}
   */
  save() {
    return this.data;
  }

  /**
   * Validate Block data
   * - check if given link is an empty string or not.
   *
   * @public
   *
   * @returns {boolean} false if saved data is incorrect, otherwise true
   */
  validate() {
    return this.data.link.trim() !== '';
  }

  /**
   * Stores all Tool's data
   *
   * @param {LinkToolData} data
   */
  set data(data) {
    this._data = Object.assign({}, {
      link: data.link || this._data.link,
      meta: data.meta || this._data.meta,
    });
  }

  /**
   * Return Tool data
   *
   * @returns {LinkToolData}
   */
  get data() {
    return this._data;
  }

  /**
   * @returns {object} - Link Tool styles
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      input: this.api.styles.input,

      /**
       * Tool's classes
       */
      container: 'link-page',
      linkPage: 'link-page__content',
      linkContent: 'link-page__content',
      linkContentRendered: 'link-page__content--rendered',
      linkTitle: 'link-page__title',
      linkText: 'link-page__anchor',
    };
  }

  /**
   * Handle link fetching errors
   * @private
   */
  fetchingFailed() {
    const index = this.api.blocks.getCurrentBlockIndex();
    this.api.blocks.delete(index)
  }

  /**
   * Helper method for elements creation
   *
   * @param tagName
   * @param classNames
   * @param attributes
   * @returns {HTMLElement}
   */
  make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName);

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames);
    } else if (classNames) {
      el.classList.add(classNames);
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName];
    }

    return el;
  }
}
