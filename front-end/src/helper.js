export const formatTimestamp = (timestamp) =>{
    const date = new Date(timestamp);
  
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return date.toLocaleString('en-US', options);
  }

export const scrollToBottom = (ref) => {
    if(ref.current){
        ref.current.scrollTop = ref.current.scrollHeight;
        console.log(ref.current.scrollTop);
    }
  };