var site_name = document.getElementById("sitename");
var web_url = document.getElementById("url");
var sub_btn = document.getElementById("sub_btn");
var card = document.querySelector(".card");
var closed_btn = document.querySelector(".closed");
var sites_group = [];
if (localStorage.getItem("Sitesgroup") != null) {
  sites_group = JSON.parse(localStorage.getItem("Sitesgroup"));
  display_sites();
}
function add_sites() {
  var sitename_regex = /^.{3,}$/;
  var weburl_regex = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/i;
  if (
    !sitename_regex.test(site_name.value) ||
    !weburl_regex.test(web_url.value)
  ) {
    card.classList.remove("d-none");
  } else {
    var sites = {
      name: site_name.value,
      url: web_url.value,
    };
    sites_group.push(sites);
    console.log(sites_group);
    localStorage.setItem("Sitesgroup", JSON.stringify(sites_group));
    clear_sites();
    display_sites();
  }
}
function clear_sites() {
  site_name.value = "";
  web_url.value = "";
}
function display_sites() {
  var row_sites = "";
  for (var i = 0; i < sites_group.length; i++) {
    row_sites += `<tr class="text-center">
            <td>${i + 1}</td>
            <td>${sites_group[i].name}</td>
            <td><button onclick = "visited_site('${sites_group[i].url}')";
             class="btn btn-success"> <i class="fa-solid fa-eye pe-2"></i>
            Visit</button></td>
           <td><button onclick="delet_sites(${i})" class="btn btn-danger"> <i class="fa-solid fa-trash-can"></i>
            Delete</button></td>
</td>
          </tr>`;
  }
  document.getElementById("tbody").innerHTML = row_sites;
}
function delet_sites(ele) {
  sites_group.splice(ele, 1);
  localStorage.setItem("Sitesgroup", JSON.stringify(sites_group));
  display_sites();
}
function visited_site(ele) {
  window.open(ele);
}
closed_btn.addEventListener("click", function () {
  card.classList.add("d-none");
});
