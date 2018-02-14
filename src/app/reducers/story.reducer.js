import { 
  SIMPLE_STORY, 
  CHANGE_STORY_DRAFT_TYPE,
  CHANGE_STORY_DRAFT_URL,
  CHANGE_STORY_DRAFT_CONTENT, 
  TOGGLE_DRAFT } from '../constants/story.constants'

import { read, save, remove } from '../services/storage.services'

const anyDraft = read('draft_started')

const initialState = {
    storyForm: { opened: read('draft_opened') === 'true', draft: {content: anyDraft ? read('draft_content') : '', url: anyDraft ? read('draft_url') : '', type: anyDraft ? read('draft_type') : ''} }
}

const storyReducer = (state = initialState, action) => {
    switch(action.type) {
      case TOGGLE_DRAFT:
        return { ...state, storyForm: {...state.storyForm, opened: action.mode}}
      case CHANGE_STORY_DRAFT_CONTENT:
        return { ...state, storyForm: {...state.storyForm, draft: { ...state.storyForm.draft, content: action.draft.content }}}
      case CHANGE_STORY_DRAFT_TYPE:
        return { ...state, storyForm: {...state.storyForm, draft: { ...state.storyForm.draft, type: action.draft.type }}}
      case CHANGE_STORY_DRAFT_URL:
        return { ...state, storyForm: {...state.storyForm, draft: { ...state.storyForm.draft, url: action.draft.url }}}
      default:
        return state
    }
}

export default storyReducer