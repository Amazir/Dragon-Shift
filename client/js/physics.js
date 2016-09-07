var checkCollision = function(pX, pY, pW, pH, bX, bY, bW, bH)
{
	return !(pX-5 + pW-5 < bX -5 ||
		bX-5 + bw-5 < pX-5 ||
		pY-5 + pH-10 < bY-5 ||
		bY-5 + bh-10 < pY-5);
}