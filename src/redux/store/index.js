/**
 * 引入createStore
 * 创建STORE
 */

import { createStore } from 'redux'
import reducer from '../reducer'

export default ()=>createStore(reducer)