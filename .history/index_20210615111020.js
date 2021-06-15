

  async function searchRakuten(keyword) {
    const applicationId  = '1044178713251188368';
    // const affiliateId    = '【アフィリエイトID】';
    const encodedKeyword = encodeURIComponent(keyword);
    const response = await fetch(`https://app.rakuten.co.jp/services/api/IchibaItem/Search/20170706?format=json&keyword=${encodedKeyword}&applicationId=${applicationId}&hits=5`);
    const data = await response.json()
    
    if(!data.Items || data.error) return console.warn('Error', data);
    if(!data.Items.length) return console.warn('searchRakuten : No Results', data);
    
    return data.Items;
  } 

  const target = document.querySelector('.target');

  searchRakuten('楽天').then(res => {
    res.map(item => {
      console.log(item.Item)
      setElementData(item)
    });
  })
  

  function setElementData(item) {
    const data = item.Item;
    const wrap = document.createElement('div');
    wrap.classList.add('target')
    const title = document.createElement('h2');
    const caption = document.createElement('p');
    const mediumImage = document.createElement('img');
    console.log(data)
    title.innerText = data.itemName;
    caption.innerText = data.itemCaption;
    mediumImage.setAttribute('src', data.mediumImageUrls[0].imageUrl);
    target.appendChild(wrap);
    wrap.appendChild(title)
    wrap.appendChild(mediumImage);
    wrap.appendChild(caption)  
  }