//
// halfviz.js
//
// instantiates all the helper classes, sets up the particle system + renderer
// and maintains the canvas/editor splitview
//

(function(){
  
  trace = arbor.etc.trace
  objmerge = arbor.etc.objmerge
  objcopy = arbor.etc.objcopy
  var parse = Parseur().parse

  $(document).ready(function(){

    var dom = $(elt)
    sys = arbor.ParticleSystem(2600, 512, 0.5)
    sys.renderer = Renderer("#viewport")
    sys.screenPadding(20)
    var _canvas = dom.find('#viewport').get(0)
    var that = {
      init:function(){       
        var src_txt = "5 -> 6\n5 -> 8\5 {color:#444, shape:dot, label:·}\n21 {color:#b01700}\n24 {color:#b01700}"
        var network = parse(src_txt)
        $.each(network.nodes, function(nname, ndata){
          if (ndata.label===undefined) ndata.label = nname
        })
        sys.merge(network)
        return that
      }   
    } 
     
  })

})()