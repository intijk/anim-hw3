function Curve() {
	
};

Curve.prototype.points=new Array();
Curve.prototype.curvePoints=function(type){
	if(!type){
		var type="CatMull-Rom";
	}
	if(type=="CatMull-Rom"){
		var M=new THREE.Matrix4(-0.5,1.5,-1.5,0.5,1,-2.5,2,-0.5,-0.5,0,0.5,0,0,1,0,0);
		var pList=[];
		var Mm,G,T,e,x,y,i,j,step,C0,C1,D0,D1;
		if(this.points.length<2){
			return pList;
		}
		for(i=0;i<this.points.length-1;i++){
			C0=this.points[i];
			C1=this.points[i+1];
			if(i==0){
				D0=C0;
			}else{
				D0=this.points[i-1];
			}
			if(i>=this.points.length-2){
				D1=C1;
			}else{
				D1=this.points[i+2];
			}
			//M=0.5*numpy.matrix([[-1,3,-3,1],[2,-5,4,-1],[-1,0,1,0],[0,2,0,0]])

			Mm=M.clone();
			//G=numpy.matrix([D0,C0,C1,D1])
			G=new THREE.Matrix4(
					D0.x,D0.y,0,0,
					C0.x,C0.y,0,0,
					C1.x,C1.y,0,0,
					D1.x,D1.y,0,0);
			MG=Mm.multiply(G);
			t=[];
			step=0.1;
			for(j=0;j<1;j+=step){
				t.push(j);
			}
			t.push(1);
			for(j=0;j<t.length;j++){
				T=new THREE.Vector4(t[j]*t[j]*t[j],t[j]*t[j],t[j],1);
				//T.applyMatrix4(MG);
				e=MG.elements;
				x=T.x*e[0]+T.y*e[1]+T.z*e[2]+T.w*e[3];
				y=T.x*e[4]+T.y*e[5]+T.z*e[6]+T.w*e[7];

				pList.push(new THREE.Vector3(x,0,y));
			}
		}
		return pList;
	}
};

