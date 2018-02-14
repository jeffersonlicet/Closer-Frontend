import { 
  SIMPLE_STORY, 
  IMAGE_STORY, 
  VIDEO_STORY, 
  TOGGLE_DRAFT, 
  DRAFT_BUTTONS_VISIBLE,
  CHANGE_STORY_DRAFT_CONTENT } from '../constants/story.constants'
import { toggleBusy } from '../actions/app.actions'
import { showLoading, hideLoading} from 'react-redux-loading-bar'
import { SendStory } from '../services/story.services'
import { read, save, remove } from '../services/storage.services'

export const send = (content, url, type) => {
  return dispatch => {
    dispatch(showLoading())
    dispatch(toggleBusy(true))
    SendStory(content, url, type)
      .then(
          result => {
            dispatch(toggleBusy(false))
            dispatch(hideLoading())
          },
          error => {
            dispatch(toggleBusy(false))
          }
      )
  }

  function success() { }
}

export const toggleDraft = (mode) => {
  return dispatch => {
    const visibility = DRAFT_BUTTONS_VISIBLE === mode ? true : false
    
    if(visibility)
      save('draft_opened', visibility)
    else 
      remove('draft_opened')

    if(!mode && !read('draft_url') && !read('draft_content'))
      remove('draft_started')
    
      dispatch(success(visibility))
  }

  function success(visibility) {  return { type: TOGGLE_DRAFT, mode: visibility } }
}

export const changeDraftContent = (content) => {
  return dispatch => {
    if(content) {
      
      if(!read('draft_started'))
        save('draft_started', true)

      save('draft_content', content)
      

    } else if(!read('draft_url')) {
        remove('draft_started')
    }

    dispatch(success())

  }

  function success() {  return { type: CHANGE_STORY_DRAFT_CONTENT, draft: { content: content } } }
}

