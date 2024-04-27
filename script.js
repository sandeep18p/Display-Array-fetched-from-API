let data1;
let data2;
let data3;
// Function to fetch data from API endpoint with a simulated delay
function fetchDataWithDelay(url, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch(url)
        .then(response => {
          resolve(response.json());
        })
        .catch(error => {
          reject(error);
        });
    }, delay);
  });
}

// Function to fetch data from first API
async function PromiseAPI1() {
try {
const response = await fetchDataWithDelay('https://dummyjson.com/posts', 1000);
return response;
} catch (error) {
throw error;
}
}

// Function to fetch data from second API
async function PromiseAPI2() {
try {
const response = await fetchDataWithDelay('https://dummyjson.com/products', 2000);
return response;
} catch (error) {
throw error;
}
}

// Function to fetch data from third API
async function PromiseAPI3() {
try {
const response = await fetchDataWithDelay('https://dummyjson.com/todos', 3000);
return response;
} catch (error) {
throw error;
}
}



function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.classList.add('post');

  const titleElement = document.createElement('h2');
  titleElement.textContent = post.title;

  const bodyElement = document.createElement('p');
  bodyElement.textContent = post.body;

  const tagsElement = document.createElement('div');
  tagsElement.classList.add('post-tags');
  post.tags.forEach(tag => {
    const tagElement = document.createElement('span');
    tagElement.textContent = tag;
    tagsElement.appendChild(tagElement);
  });

  const infoElement = document.createElement('div');
  infoElement.classList.add('post-info');
  infoElement.textContent = `Posted by User ID: ${post.userId} | Reactions: ${post.reactions}`;

  postElement.appendChild(titleElement);
  postElement.appendChild(bodyElement);
  postElement.appendChild(tagsElement);
  postElement.appendChild(infoElement);

  return postElement;
}

//
async function renderPosts(data1) {
console.log('one');
const postsContainer = document.getElementById('posts');
  const postsData = data1;

  postsContainer.innerHTML="";

  document.getElementById('container1').classList.add("hidden");
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML="";

    document.getElementById("productContainer").classList.add("hidden");
    document.getElementById("productContainer").innerHTML="";


  if (postsData && postsData.posts) {
    postsData.posts.forEach(post => {
      const postElement = createPostElement(post);
      postsContainer.appendChild(postElement);
    });

    document.getElementById('container').classList.remove("hidden");
  }
}

// Button click event listener
document.getElementById('startButton').addEventListener('click', () => {
  // Start the promise chain

  // var typed = new Typed('#element', {
  //   strings: ['Wait till 6 seconds to resolve all the promises'],
  //   typeSpeed: 30,
  // });
  function startTimer() {
    let timerDisplay = document.getElementById('startButton');
    timerDisplay.disabled = true;
    // timerDisplay.style.width = '100%';
    let timeRemaining = 6;
    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
          timerDisplay.classList.add("hidden");
            clearInterval(timerInterval);
        } else {
          timerDisplay.innerHTML = `Wait till  <span class="top">${timeRemaining}</span>  seconds to resolve all promises`;
            timeRemaining--;
        }
    }, 1000);
}
startTimer();    

  
  setTimeout(function() {
    // typed.destroy(); 
     
      
    document.getElementById('element').innerHTML = '<h1 class="heading">Now you can use the below button to get data on screen</h1>';
    var elements = document.getElementsByClassName('one');

       for (var i = 0; i < elements.length; i++) {
       elements[i].style.justifyContent = 'flex-start';
       elements[i].style.paddingTop = '20px';
       elements[i].style.flexDirection = 'column';
          }
          document.getElementById('btn').style.padding = '40px';
          
    document.getElementById('startButton').style.display = 'none';
    document.getElementById('btn').classList.remove("hidden");
    document.getElementById('posts').classList.remove("hidden");
   
  }, 7000);
  

   
  PromiseAPI1()
    .then(data => {
    //   console.log('Data from API 1:', data);
      // Return the next promise only when the previous one is resolved
      data1=data;
      return PromiseAPI2();
    })
    .then(data => {
    //   console.log('Data from API 2:', data);
      data2=data;
      return PromiseAPI3();
    })
    .then(data => {
      // console.log('Data from API 3:', data);
      data3=data;
      console.log('All data fetched successfully.');
      console.log('Data from API 1:', data1);
      console.log('Data from API 2:', data2);
      console.log('Data from API 3:', data3);

      document.getElementById('btn').innerHTML=`<button id="bt1" class="btn">Show POSTS from 1st promise</button>
<button id="bt2" class="btn">Show PRODUCTS from 2nd promise</button>
<button id="bt3" class="btn">Show TODOS from 3rd promise</button>`;
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
});

document.getElementById('btn').addEventListener('click', (event) => {
  if (event.target.id === 'bt1') {
    renderPosts(data1);
  }

  if (event.target.id === 'bt2'){
    
    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML="";
    document.getElementById('container').classList.add("hidden");

    document.getElementById('container1').classList.add("hidden");
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML="";

    
    const container = document.getElementById("productContainer");
    container.innerHTML="";
    container.classList.remove('hidden');
    data2.products.forEach(product => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("product");
  
      const thumbnail = document.createElement("img");
      thumbnail.classList.add("img1");
      thumbnail.src = product.thumbnail;
      productDiv.appendChild(thumbnail);
  
      const productInfo = document.createElement("div");
      productInfo.classList.add("product-info");
  
      const title = document.createElement("div");
      title.classList.add("title");
      title.textContent = product.title;
      productInfo.appendChild(title);
  
  
      const description = document.createElement("div");
      description.classList.add("description");
      description.textContent = product.description;
      productInfo.appendChild(description);

      
      const brand = document.createElement("div");
      brand.classList.add("brand");
      brand.textContent = "Brand: " + product.brand;
      productInfo.appendChild(brand);
  
      const category = document.createElement("div");
      category.classList.add("category");
      category.textContent = "Category: " + product.category;
      productInfo.appendChild(category);
  
      const price = document.createElement("div");
      price.classList.add("price");
      price.textContent = "Price: $" + product.price.toFixed(2);
      if (product.discountPercentage > 0) {
        const discount = document.createElement("span");
        discount.classList.add("discount");
        discount.textContent = " (-" + product.discountPercentage.toFixed(2) + "%)";
        price.appendChild(discount);
      }
      productInfo.appendChild(price);
  
      const stock = document.createElement("div");
      stock.classList.add("stock");
      stock.textContent = "Stock: " + product.stock;
      productInfo.appendChild(stock);
  
      const rating = document.createElement("div");
      rating.classList.add("rating");
      rating.textContent = "Rating: " + product.rating;
      productInfo.appendChild(rating);
  
      // Create a section for product images
      const imagesSection = document.createElement("div");
      imagesSection.classList.add("images-section");
  
      product.images.forEach(imageUrl => {
        const smallImage = document.createElement("img");
        smallImage.classList.add("small-image");
        smallImage.src = imageUrl;
        imagesSection.appendChild(smallImage);
      });
  
      productInfo.appendChild(imagesSection);
  
      productDiv.appendChild(productInfo);
      container.appendChild(productDiv);
     });
  }



  if (event.target.id === 'bt3') {
    document.getElementById('container1').classList.remove("hidden");
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML="";

    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML="";
    document.getElementById('container').classList.add("hidden");
    
    document.getElementById("productContainer").classList.add("hidden");
    document.getElementById("productContainer").innerHTML="";

data3.todos.forEach(todo => {
const row = document.createElement('tr');
row.innerHTML = `
  <td class="hello">${todo.userId}</td>
  <td class="hello">${todo.todo}</td>
  <td class="${todo.completed ? 'completed' : 'Still incomplete'}">${todo.completed ? 'Completed' : 'Incomplete'}</td>
`;
todoList.appendChild(row);
});
  }

 

});