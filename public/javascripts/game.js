window.onload = function(){
    cc.game.onStart = function(){
        //load resources
        cc.LoaderScene.preload(["HelloWorld.png"], function () {
            var MyScene = cc.Scene.extend({
                onEnter:function () {
                    this._super();
                    var size = cc.director.getWinSize();


                    var label = cc.LabelTTF.create("in", "OCR A Std", 40);
                    label.setPosition(300, 300);
                    label.setColor(0,1,1);
                    this.addChild(label, 1);

                    var label2 = cc.LabelTTF.create("Xile", "OCR A Std", 40);
                    label2.setPosition(385, 300);
                    this.addChild(label2, 1);
                }
            });
        cc.director.runScene(new MyScene()); }, this);
    };
    cc.game.run("gameCanvas");
};
