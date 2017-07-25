function randomItem (list) 
{
  return list[Math.floor(Math.random() * list.length)];
};

var theme = {
  header: 'light-blue accent-2',
  button: '',
  badges: {
    recv: 'teal lighten-2 white-text',  
    pay: 'teal darken-2 white-text'
  }
};

var PAGE_SIZE = 5;
var PAGE = 1;

var BALANCE = 1000000000000;

var ws = {};

ws.data = {};

if (typeof localStorage.paymentList === 'undefined') {
  document.getElementById("list").innerHTML.split(",").forEach(function(i){ ws.data[i] = {payment:i, done: false }});
} else {
  ws.data = JSON.parse(localStorage.paymentList);
}

var resId = document.getElementById("logo-container");

function spinItem() {
    resId.innerHTML = ws.data[randomItem(Object.keys(ws.data))]["payment"];
}


var oEl = document.getElementById("container");;

function makeBadge(content, cl){
  var o='<span class="badge '+ cl +'">'+content+'</span>';
  return o;
}

function makeIcon(type){
  var o = '';
  o+= '<i class="material-icons">'+type+'</i>'; 
  return o;
}

function renderRecv(id, task){
  var o = '';

  o+= '<tr data="'+id+'" class="card blue-grey lighten-4"><td>';
  o+= makeIcon("redeem");
  o+= '</td><td>'+task.payment+'</td><td>';
  o+= makeIcon("grade");
  o+='</td></tr>';

  return o;
}


function renderTask(id, task){
  var o = '';
  var isRequest = task.payment.includes("Request");

  o+= '<tr data="'+id+'"><td class="js-edit">'

  isRequest ? o+= makeIcon("input") : o+= makeIcon("payment");

  o+= '</td><td>'+task.payment+'</td><td>';
  if(task.done){
    o+= makeIcon("grade");
  } else {
    o+= makeIcon("payment");
  }
  o+='</td></tr>';

  return o;
}

function renderList(tasks){
  var o = renderPage(tasks);

  var header = '<button class="waves-effect waves-light btn">' + makeIcon("note_add") + 'Add</button><input id="newTask" type="text"/><table><thead class="collection with-header"  ><tr><th></th><th>Payment</th><th>Done</th></tr></thead><tbody>';
  var footer = '</tbody></table>';

  return header + o + footer;
}

function editTask(el){
  /* get el replace with row inc input for editor */
  var o = '', id = el.attributes.data.value;
  o +='<tr class="collection-item" data="'+id+'"><td>Save</td><td></td><td><input type="option" checked="';
  if(ws.data[id].done){ o+='checked'; }
  o+= '"></td></tr>';
  return o;
}

function saveList() {
  localStorage.paymentList = JSON.stringify(ws.data);
}

function renderPage(tasks){
  var o = '';
  var pKeys = Object.keys(tasks);
  var smallPage = paginate(pKeys, PAGE_SIZE, PAGE);
  
  for (var v in smallPage) {
    o += renderTask(v, tasks[smallPage[v]]);
  }

  return o;
}

function getList() {
  oEl.innerHTML = renderList(ws.data);
  oEl.innerHTML += renderPages(PAGE);
  var payments = document.getElementsByTagName("tr");
  var zen = 0;
  for (var b in payments) { 
    if(parseInt(b) == b) {
      payments[b].addEventListener("click",function(e){
        var o = e.currentTarget; 
        var id = e.currentTarget.attributes.data.value;
        var dataId = ws.data[Object.keys(ws.data)[id]];

        dataId.done = !dataId.done;
        getList();
      }); 
      zen++;
    }
  }

  var pages = document.getElementsByClassName("page");
  if(pages.length) {
    for (var j in pages){
      if(parseInt(j) == j) {
        pages[j].addEventListener("click", function(e){
          PAGE = e.currentTarget.attributes.data.value;
          getList();
        });
      }
    }
  }

  document.getElementById("newTask").addEventListener("change",function(e){
    ws.data["task-"+zen] = {"payment":document.getElementById("newTask").value,done: false};
    saveList();
    getList();
  });
  if(document.getElementById("editTask") == null) {
  document.getElementById("newTask").focus(); } else {
  document.getElementById("editTask").focus(); 
  }
}

function delItems() {
  ws.data = {};
  PAGE = 1;

  getList();
}

function bindAction(el,a) {
  if(el.hasOwnProperty() == false) {  

    el.addEventListener(a,function(e){
      console.log(e);
    });
  }
}

getList();
document.getElementById("newTask").focus();

var mNames = "JAMES,JOHN,ROBERT,MICHAEL,WILLIAM,DAVID,RICHARD,CHARLES,JOSEPH,THOMAS,CHRISTOPHER,DANIEL,PAUL,MARK,DONALD,GEORGE,KENNETH,STEVEN,EDWARD,BRIAN,RONALD,ANTHONY,KEVIN,JASON,MATTHEW,GARY,TIMOTHY,JOSE,LARRY,JEFFREY,FRANK,SCOTT,ERIC,STEPHEN,ANDREW,RAYMOND,GREGORY,JOSHUA,JERRY,DENNIS,WALTER,PATRICK,PETER,HAROLD,DOUGLAS,HENRY,CARL,ARTHUR,RYAN,ROGER,JOE,JUAN,JACK,ALBERT,JONATHAN,JUSTIN,TERRY,GERALD,KEITH,SAMUEL,WILLIE,RALPH,LAWRENCE,NICHOLAS,ROY,BENJAMIN,BRUCE,BRANDON,ADAM,HARRY,FRED,WAYNE,BILLY,STEVE,LOUIS,JEREMY,AARON,RANDY,HOWARD,EUGENE,CARLOS,RUSSELL,BOBBY,VICTOR,MARTIN,ERNEST,PHILLIP,TODD,JESSE,CRAIG,ALAN,SHAWN,CLARENCE,SEAN,PHILIP,CHRIS,JOHNNY,EARL,JIMMY,ANTONIO,DANNY,BRYAN,TONY,LUIS,MIKE,STANLEY,LEONARD,NATHAN,DALE,MANUEL,RODNEY,CURTIS,NORMAN,ALLEN,MARVIN,VINCENT,GLENN,JEFFERY,TRAVIS,JEFF,CHAD,JACOB,LEE,MELVIN,ALFRED,KYLE,FRANCIS,BRADLEY,JESUS,HERBERT,FREDERICK,RAY,JOEL,EDWIN,DON,EDDIE,RICKY,TROY,RANDALL,BARRY,ALEXANDER,BERNARD,MARIO,LEROY,FRANCISCO,MARCUS,MICHEAL,THEODORE,CLIFFORD,MIGUEL,OSCAR,JAY,JIM,TOM,CALVIN,ALEX,JON,RONNIE,BILL,LLOYD,TOMMY,LEON,DEREK,WARREN,DARRELL,JEROME,FLOYD,LEO,ALVIN,TIM,WESLEY,GORDON,DEAN,GREG,JORGE,DUSTIN,PEDRO,DERRICK,DAN,LEWIS,ZACHARY,COREY,HERMAN,MAURICE,VERNON,ROBERTO,CLYDE,GLEN,HECTOR,SHANE,RICARDO,SAM,RICK,LESTER,BRENT,RAMON,CHARLIE,TYLER,GILBERT,GENE,MARC,REGINALD,RUBEN,BRETT,ANGEL,NATHANIEL,RAFAEL,LESLIE,EDGAR,MILTON,RAUL,BEN,CHESTER,CECIL,DUANE,FRANKLIN,ANDRE,ELMER,BRAD,GABRIEL,RON,MITCHELL,ROLAND,ARNOLD,HARVEY,JARED,ADRIAN,KARL,CORY,CLAUDE,ERIK,DARRYL,JAMIE,NEIL,JESSIE,CHRISTIAN,JAVIER,FERNANDO,CLINTON,TED,MATHEW,TYRONE,DARREN,LONNIE,LANCE,CODY,JULIO,KELLY,KURT,ALLAN,NELSON,GUY,CLAYTON,HUGH,MAX,DWAYNE,DWIGHT,ARMANDO,FELIX,JIMMIE,EVERETT,JORDAN,IAN,WALLACE,KEN,BOB,JAIME,CASEY,ALFREDO,ALBERTO,DAVE,IVAN,JOHNNIE,SIDNEY,BYRON,JULIAN,ISAAC,MORRIS,CLIFTON,WILLARD,DARYL,ROSS,VIRGIL,ANDY,MARSHALL,SALVADOR,PERRY,KIRK,SERGIO,MARION,TRACY,SETH,KENT,TERRANCE,RENE,EDUARDO,TERRENCE,ENRIQUE,FREDDIE,WADE,JAMES,JOHN,ROBERT,MICHAEL,WILLIAM,DAVID,RICHARD,CHARLES,JOSEPH,THOMAS,CHRISTOPHER,DANIEL,PAUL,MARK,DONALD,GEORGE,KENNETH,STEVEN,EDWARD,BRIAN,RONALD,ANTHONY,KEVIN,JASON,MATTHEW,GARY,TIMOTHY,JOSE,LARRY,JEFFREY,FRANK,SCOTT,ERIC,STEPHEN,ANDREW,RAYMOND,GREGORY,JOSHUA,JERRY,DENNIS,WALTER,PATRICK,PETER,HAROLD,DOUGLAS,HENRY,CARL,ARTHUR,RYAN,ROGER,JOE,JUAN,JACK,ALBERT,JONATHAN,JUSTIN,TERRY,GERALD,KEITH,SAMUEL,WILLIE,RALPH,LAWRENCE,NICHOLAS,ROY,BENJAMIN,BRUCE,BRANDON,ADAM,HARRY,FRED,WAYNE,BILLY,STEVE,LOUIS,JEREMY,AARON,RANDY,HOWARD,EUGENE,CARLOS,RUSSELL,BOBBY,VICTOR,MARTIN,ERNEST,PHILLIP,TODD,JESSE,CRAIG,ALAN,SHAWN,CLARENCE,SEAN,PHILIP,CHRIS,JOHNNY,EARL,JIMMY,ANTONIO,DANNY,BRYAN,TONY,LUIS,MIKE,STANLEY,LEONARD,NATHAN,DALE,MANUEL,RODNEY,CURTIS,NORMAN,ALLEN,MARVIN,VINCENT,GLENN,JEFFERY,TRAVIS,JEFF,CHAD,JACOB,LEE,MELVIN,ALFRED,KYLE,FRANCIS,BRADLEY,JESUS,HERBERT,FREDERICK,RAY,JOEL,EDWIN,DON,EDDIE,RICKY,TROY,RANDALL,BARRY,ALEXANDER,BERNARD,MARIO,LEROY,FRANCISCO,MARCUS,MICHEAL,THEODORE,CLIFFORD,MIGUEL,OSCAR,JAY,JIM,TOM,CALVIN,ALEX,JON,RONNIE,BILL,LLOYD,TOMMY,LEON,DEREK,WARREN,DARRELL,JEROME,FLOYD,LEO,ALVIN,TIM,WESLEY,GORDON,DEAN,GREG,JORGE,DUSTIN,PEDRO,DERRICK,DAN,LEWIS,ZACHARY,COREY,HERMAN,MAURICE,VERNON,ROBERTO,CLYDE,GLEN,HECTOR,SHANE,RICARDO,SAM,RICK,LESTER,BRENT,RAMON,CHARLIE,TYLER,GILBERT,GENE,MARC,REGINALD,RUBEN,BRETT,ANGEL,NATHANIEL,RAFAEL,LESLIE,EDGAR,MILTON,RAUL,BEN,CHESTER,CECIL,DUANE,FRANKLIN,ANDRE,ELMER,BRAD,GABRIEL,RON,MITCHELL,ROLAND,ARNOLD,HARVEY,JARED,ADRIAN,KARL,CORY,CLAUDE,ERIK,DARRYL,JAMIE,NEIL,JESSIE,CHRISTIAN,JAVIER,FERNANDO,CLINTON,TED,MATHEW,TYRONE,DARREN,LONNIE,LANCE,CODY,JULIO,KELLY,KURT,ALLAN,NELSON,GUY,CLAYTON,HUGH,MAX,DWAYNE,DWIGHT,ARMANDO,FELIX,JIMMIE,EVERETT,JORDAN,IAN,WALLACE,KEN,BOB,JAIME,CASEY,ALFREDO,ALBERTO,DAVE,IVAN,JOHNNIE,SIDNEY,BYRON,JULIAN,ISAAC,MORRIS,CLIFTON,WILLARD,DARYL,ROSS,VIRGIL,ANDY,MARSHALL,SALVADOR,PERRY,KIRK,SERGIO,MARION,TRACY,SETH,KENT,TERRANCE,RENE,EDUARDO,TERRENCE,ENRIQUE,FREDDIE,WADE";
var fNames = "MARY,PATRICIA,LINDA,BARBARA,ELIZABETH,JENNIFER,MARIA,SUSAN,MARGARET,DOROTHY,LISA,NANCY,KAREN,BETTY,HELEN,SANDRA,DONNA,CAROL,RUTH,SHARON,MICHELLE,LAURA,SARAH,KIMBERLY,DEBORAH,JESSICA,SHIRLEY,CYNTHIA,ANGELA,MELISSA,BRENDA,AMY,ANNA,REBECCA,VIRGINIA,KATHLEEN,PAMELA,MARTHA,DEBRA,AMANDA,STEPHANIE,CAROLYN,CHRISTINE,MARIE,JANET,CATHERINE,FRANCES,ANN,JOYCE,DIANE,ALICE,JULIE,HEATHER,TERESA,DORIS,GLORIA,EVELYN,JEAN,CHERYL,MILDRED,KATHERINE,JOAN,ASHLEY,JUDITH,ROSE,JANICE,KELLY,NICOLE,JUDY,CHRISTINA,KATHY,THERESA,BEVERLY,DENISE,TAMMY,IRENE,JANE,LORI,RACHEL,MARILYN,ANDREA,KATHRYN,LOUISE,SARA,ANNE,JACQUELINE,WANDA,BONNIE,JULIA,RUBY,LOIS,TINA,PHYLLIS,NORMA,PAULA,DIANA,ANNIE,LILLIAN,EMILY,ROBIN,PEGGY,CRYSTAL,GLADYS,RITA,DAWN,CONNIE,FLORENCE,TRACY,EDNA,TIFFANY,CARMEN,ROSA,CINDY,GRACE,WENDY,VICTORIA,EDITH,KIM,SHERRY,SYLVIA,JOSEPHINE,THELMA,SHANNON,SHEILA,ETHEL,ELLEN,ELAINE,MARJORIE,CARRIE,CHARLOTTE,MONICA,ESTHER,PAULINE,EMMA,JUANITA,ANITA,RHONDA,HAZEL,AMBER,EVA,DEBBIE,APRIL,LESLIE,CLARA,LUCILLE,JAMIE,JOANNE,ELEANOR,VALERIE,DANIELLE,MEGAN,ALICIA,SUZANNE,MICHELE,GAIL,BERTHA,DARLENE,VERONICA,JILL,ERIN,GERALDINE,LAUREN,CATHY,JOANN,LORRAINE,LYNN,SALLY,REGINA,ERICA,BEATRICE,DOLORES,BERNICE,AUDREY,YVONNE,ANNETTE,JUNE,SAMANTHA,MARION,DANA,STACY,ANA,RENEE,IDA,VIVIAN,ROBERTA,HOLLY,BRITTANY,MELANIE,LORETTA,YOLANDA,JEANETTE,LAURIE,KATIE,KRISTEN,VANESSA,ALMA,SUE,ELSIE,BETH,JEANNE,VICKI,CARLA,TARA,ROSEMARY,EILEEN,TERRI,GERTRUDE,LUCY,TONYA,ELLA,STACEY,WILMA,GINA,KRISTIN,JESSIE,NATALIE,AGNES,VERA,WILLIE,CHARLENE,BESSIE,DELORES,MELINDA,PEARL,ARLENE,MAUREEN,COLLEEN,ALLISON,TAMARA,JOY,GEORGIA,CONSTANCE,LILLIE,CLAUDIA,JACKIE,MARCIA,TANYA,NELLIE,MINNIE,MARLENE,HEIDI,GLENDA,LYDIA,VIOLA,COURTNEY,MARIAN,STELLA,CAROLINE,DORA,JO,VICKIE,MATTIE,TERRY,MAXINE,IRMA,MABEL,MARSHA,MYRTLE,LENA,CHRISTY,DEANNA,PATSY,HILDA,GWENDOLYN,JENNIE,NORA,MARGIE,NINA,CASSANDRA,LEAH,PENNY,KAY,PRISCILLA,NAOMI,CAROLE,BRANDY,OLGA,BILLIE,DIANNE,TRACEY,LEONA,JENNY,FELICIA,SONIA,MIRIAM,VELMA,BECKY,BOBBIE,VIOLET,KRISTINA,TONI,MISTY,MAE,SHELLY,DAISY,RAMONA,SHERRI,ERIKA,KATRINA,CLAIRE,LINDSEY,LINDSAY,GENEVA,GUADALUPE,BELINDA,MARGARITA,SHERYL,CORA,FAYE,ADA,NATASHA,SABRINA,ISABEL,MARGUERITE,HATTIE,HARRIET,MOLLY,CECILIA,KRISTI,BRANDI,BLANCHE,SANDY,ROSIE,JOANNA,IRIS,EUNICE,ANGIE,INEZ,LYNDA,MADELINE,AMELIA,ALBERTA,GENEVIEVE,MONIQUE,JODI,JANIE,MAGGIE,KAYLA,SONYA,JAN,LEE,KRISTINE,CANDACE,FANNIE,MARYANN,OPAL,ALISON,YVETTE,MELODY,LUZ,SUSIE,OLIVIA,FLORA,SHELLEY,KRISTY,MAMIE,LULA,LOLA,VERNA,BEULAH,ANTOINETTE,CANDICE,JUANA,JEANNETTE,PAM,KELLI,HANNAH,WHITNEY,BRIDGET,KARLA,CELIA,LATOYA,PATTY,SHELIA,GAYLE,DELLA,VICKY,LYNNE,SHERI,MARIANNE,KARA,JACQUELYN,ERMA,BLANCA,MYRA,LETICIA,PAT,KRISTA,ROXANNE,ANGELICA,JOHNNIE,ROBYN,FRANCIS,ADRIENNE,ROSALIE,ALEXANDRA,BROOKE,BETHANY,SADIE,BERNADETTE,TRACI,JODY,KENDRA,JASMINE,NICHOLE,RACHAEL,CHELSEA,MABLE,ERNESTINE,MURIEL,MARCELLA,ELENA,KRYSTAL,ANGELINA,NADINE,KARI,ESTELLE,DIANNA,PAULETTE,LORA,MONA,DOREEN,ROSEMARIE,ANGEL,DESIREE,ANTONIA,HOPE,GINGER,JANIS,BETSY,CHRISTIE,FREDA,MERCEDES,MEREDITH,LYNETTE,TERI,CRISTINA,EULA,LEIGH,MEGHAN,SOPHIA,ELOISE,ROCHELLE,GRETCHEN,CECELIA,RAQUEL,HENRIETTA,ALYSSA,JANA,KELLEY,GWEN,KERRY,JENNA,TRICIA,LAVERNE,OLIVE,ALEXIS,TASHA,SILVIA,ELVIRA,CASEY,DELIA,SOPHIE,KATE,PATTI,LORENA,KELLIE,SONJA,LILA,LANA,DARLA,MAY,MINDY,ESSIE,MANDY,LORENE,ELSA,JOSEFINA,JEANNIE,MIRANDA,DIXIE,LUCIA,MARTA,FAITH,LELA,JOHANNA,SHARI,CAMILLE,TAMI,SHAWNA,ELISA,EBONY,MELBA,ORA,NETTIE,TABITHA,OLLIE,JAIME,WINIFRED,KRISTIE,MARINA,ALISHA,AIMEE,RENA,MYRNA,MARLA,TAMMIE,LATASHA,BONITA,PATRICE,RONDA,SHERRIE,ADDIE,FRANCINE,DELORIS,STACIE,ADRIANA,CHERI,SHELBY,ABIGAIL,CELESTE,JEWEL,CARA,ADELE,REBEKAH,LUCINDA,DORTHY,CHRIS,EFFIE,TRINA,REBA,SHAWN,SALLIE,AURORA,LENORA,ETTA,LOTTIE,KERRI,TRISHA,NIKKI,ESTELLA,FRANCISCA,JOSIE,TRACIE,MARISSA,KARIN,BRITTNEY,JANELLE,LOURDES,LAUREL,HELENE,FERN,ELVA,CORINNE,KELSEY,INA,BETTIE,ELISABETH,AIDA,CAITLIN,INGRID,IVA,EUGENIA,CHRISTA,GOLDIE,CASSIE,MAUDE,JENIFER,THERESE,FRANKIE,DENA,LORNA,JANETTE,LATONYA,CANDY,MORGAN,CONSUELO,TAMIKA,ROSETTA,DEBORA,CHERIE,POLLY,DINA,JEWELL,FAY,JILLIAN,DOROTHEA,NELL,TRUDY,ESPERANZA,PATRICA,KIMBERLEY,SHANNA,HELENA,CAROLINA,CLEO,STEFANIE,ROSARIO,OLA,JANINE,MOLLIE,LUPE,ALISA,LOU,MARIBEL,SUSANNE,BETTE,SUSANA,ELISE,CECILE,ISABELLE,LESLEY,JOCELYN,PAIGE,JONI,RACHELLE,LEOLA,DAPHNE,ALTA,ESTER,PETRA,GRACIELA,IMOGENE,JOLENE,KEISHA,LACEY,GLENNA,GABRIELA,KERI,URSULA,LIZZIE,KIRSTEN,SHANA,ADELINE,MAYRA,JAYNE,JACLYN,GRACIE,SONDRA,CARMELA,MARISA,ROSALIND,CHARITY,TONIA,BEATRIZ,MARISOL,CLARICE,JEANINE,SHEENA,ANGELINE,FRIEDA,LILY,ROBBIE,SHAUNA,MILLIE,CLAUDETTE,CATHLEEN,ANGELIA,GABRIELLE,AUTUMN,KATHARINE,SUMMER,JODIE,STACI,LEA,CHRISTI,JIMMIE,JUSTINE,ELMA,LUELLA,MARGRET,DOMINIQUE,SOCORRO,RENE,MARTINA,MARGO,MAVIS,CALLIE,BOBBI,MARITZA,LUCILE,LEANNE,JEANNINE,DEANA,AILEEN,LORIE,LADONNA,WILLA,MANUELA,GALE,SELMA,DOLLY,SYBIL,ABBY,LARA,DALE,IVY,DEE,WINNIE,MARCY,LUISA,JERI,MAGDALENA,OFELIA,MEAGAN,AUDRA,MATILDA,LEILA,CORNELIA,BIANCA,SIMONE,BETTYE,RANDI,VIRGIE,LATISHA,BARBRA,GEORGINA,ELIZA,LEANN,BRIDGETTE,RHODA,HALEY,ADELA,NOLA,BERNADINE,FLOSSIE,ILA,GRETA,RUTHIE,NELDA,MINERVA,LILLY,TERRIE,LETHA,HILARY,ESTELA,VALARIE,BRIANNA,ROSALYN,EARLINE,CATALINA,AVA,MIA,CLARISSA,LIDIA,CORRINE,ALEXANDRIA,CONCEPCION,TIA,SHARRON,RAE,DONA,ERICKA,JAMI,ELNORA,CHANDRA,LENORE,NEVA,MARYLOU,MELISA,TABATHA,SERENA,AVIS,ALLIE,SOFIA,JEANIE,ODESSA,NANNIE,HARRIETT,LORAINE,PENELOPE,MILAGROS,EMILIA,BENITA,ALLYSON,ASHLEE,TANIA,TOMMIE,ESMERALDA,KARINA,EVE,PEARLIE,ZELMA,MALINDA,NOREEN,TAMEKA,SAUNDRA,HILLARY,AMIE,ALTHEA,ROSALINDA,JORDAN,LILIA,ALANA,GAY,CLARE,ALEJANDRA,ELINOR,MICHAEL,LORRIE,JERRI,DARCY,EARNESTINE,CARMELLA,TAYLOR,NOEMI,MARCIE,LIZA,ANNABELLE,LOUISA,EARLENE,MALLORY,CARLENE,NITA,SELENA,TANISHA,KATY,JULIANNE,JOHN,LAKISHA,EDWINA,MARICELA,MARGERY,KENYA,DOLLIE,ROXIE,ROSLYN,KATHRINE,NANETTE,CHARMAINE,LAVONNE,ILENE,KRIS,TAMMI,SUZETTE,CORINE,KAYE,JERRY,MERLE,CHRYSTAL,LINA,DEANNE,LILIAN,JULIANA,ALINE,LUANN,KASEY,MARYANNE,EVANGELINE,COLETTE,MELVA,LAWANDA,YESENIA,NADIA,MADGE,KATHIE,EDDIE,OPHELIA,VALERIA,NONA,MITZI,MARI,GEORGETTE,CLAUDINE,FRAN,ALISSA,ROSEANN,LAKEISHA,SUSANNA,REVA,DEIDRE,CHASITY,SHEREE,CARLY,JAMES,ELVIA,ALYCE,DEIRDRE,GENA,BRIANA,ARACELI,KATELYN,ROSANNE,WENDI,TESSA,BERTA,MARVA,IMELDA,MARIETTA,MARCI,LEONOR,ARLINE,SASHA,MADELYN,JANNA,JULIETTE,DEENA,AURELIA,JOSEFA,AUGUSTA,LILIANA,YOUNG,CHRISTIAN,LESSIE,AMALIA,SAVANNAH,ANASTASIA,VILMA,NATALIA,ROSELLA,LYNNETTE,CORINA,ALFREDA,LEANNA,CAREY,AMPARO,COLEEN,TAMRA,AISHA,WILDA,KARYN,CHERRY,QUEEN,MAURA,MAI,EVANGELINA,ROSANNA,HALLIE,ERNA,ENID,MARIANA,LACY,JULIET,JACKLYN,FREIDA,MADELEINE,MARA,HESTER,CATHRYN,LELIA,CASANDRA,BRIDGETT,ANGELITA,JANNIE,DIONNE,ANNMARIE,KATINA,BERYL,PHOEBE,MILLICENT,KATHERYN,DIANN,CARISSA,MARYELLEN,LIZ,LAURI,HELGA,GILDA,ADRIAN,RHEA,MARQUITA,HOLLIE,TISHA,TAMERA,ANGELIQUE,FRANCESCA,BRITNEY,KAITLIN,LOLITA,FLORINE,ROWENA,REYNA,TWILA,FANNY,JANELL,INES,CONCETTA,BERTIE,ALBA,BRIGITTE,ALYSON,VONDA,PANSY,ELBA,NOELLE,LETITIA,KITTY,DEANN,BRANDIE,LOUELLA,LETA,FELECIA,SHARLENE,LESA,BEVERLEY,ROBERT,ISABELLA,HERMINIA,TERRA,CELINA";
var rNames = mNames + "," + fNames;
var srNames = rNames.split(",");
var pr = ["Payment", "Request"];

function makePay(id, name){ ws.data[id] = {done: false, payment: name} }

function randAmount() {
  return "" + 1 + Math.floor(Math.random()*9) + "," + Math.floor(Math.random()*9) + "00";
}

var n = 0;

/*
var q = setInterval(function(){
  
  var vTitle = randomItem(pr)
     + " " + randomItem(srNames)
     + " " + randAmount();

  makePay( "task-"+ n++, vTitle);

  resId.innerHTML = vTitle;
  getList();} , 3000);
  
*/

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function formatCcy(val){
  var ccy = '&#8358;';
  var o = ccy;
  var B = Math.floor(val /1000000000);
  var db = val - B * 1000000000;
  var M = Math.floor(db /1000000);
  var dm = db - M * 1000000;
  var m = Math.floor(dm /1000);
  var u = val % 1000;

  if(B){
    o+= B + ',' + pad(M,3) + ',' + pad(m,3) + ',' + pad(u,3);
  } else if(M) {
    o+=  M + ',' + pad(m,3) + ',' + pad(u,3);
  } else if(m) {
    o+= m+ ',' + pad(u,3);
  } else {
    o+= u;
  }

  return o;
}

function parseCcy(ccy){
  return parseInt(ccy.split(",").join(""));
}

function showBalance(){
  resId.innerHTML = formatCcy(BALANCE);
}

function randomRecv(){
  var amount = randAmount();
  var vTitle = pr[1]
     + " " + randomItem(srNames)
     + " " + makeBadge(formatCcy(parseCcy(amount)), theme.badges.recv);

  makePay( "task-"+ n++, vTitle);

  BALANCE += parseCcy(amount);

  showBalance();
  getList();
}

function randomPay(){
  var amount = randAmount();
  var vTitle = pr[0]
     + " " + randomItem(srNames)
     + " " + makeBadge(formatCcy(parseCcy(amount)), theme.badges.pay);

  makePay( "task-"+ n++, vTitle);

  BALANCE -= parseCcy(amount);

  showBalance();
  getList();
}

// window.addEventListener("message", receiveMessage, false);

function receiveMessage(event)
{
//  if (event.origin !== "https://random-movie-chrisclarke1977.c9users.io/")
//    return;

  // ...
  var evData = JSON.parse(event.data);
  
  var vRecv = { type: evData.type,
                user: evData.user,
                amount: evData.amount
  };

  var vTitle = vRecv.type + " " +
              vRecv.user + " " +
              vRecv.amount;

  makePay( "task-"+ n++, vTitle);

  resId.innerHTML = vTitle;
}

function sendMessage(type, user, amount){
  var vSend = { type: randomItem(pr),
                 user: randomItem(srNames),
                 amount: randAmount()
  };

  top.postMessage(JSON.stringify(vSend),"https://random-movie-chrisclarke1977.c9users.io/");
}

function paginate (array, page_size, page_number) {
  --page_number; // because pages logically start with 1, but technically with 0
  return array.slice(page_number * page_size, (page_number + 1) * page_size);
}

function renderPageButton(n, active){
  var o = '<li data="'+n+'" class="page ';
  active ? o+= 'active"><a href="#!">' : o+= 'waves-effect"><a href="#!">';
  o+= n + '</a></li>';
  return o;
}

function renderPages(page){
  var o = '<ul class="pagination">';
  var arr = Object.keys(ws.data);
  var oPreFoot = '<li class="waves-effect">';
  var oFoot = '<a href="#!">'+ makeIcon("chevron_right") + '</a></li></ul>';

  if (page == 1){
    o+= '<li class="disabled"><a href="#!">' + makeIcon("chevron_left") + '</a></li>';
  }  else {
    o+= '<li class="waves-effect"><a href="#!">' + makeIcon("chevron_left") + '</a></li>';
  }

  if (page == arr.length / PAGE_SIZE) {
    oPreFoot = '<li class="disabled">';
  }

  for (var a=1; a < arr.length / PAGE_SIZE; a++){
    o+= renderPageButton(a, a==PAGE);
  }
  o+= oPreFoot + oFoot;

  return o;
}